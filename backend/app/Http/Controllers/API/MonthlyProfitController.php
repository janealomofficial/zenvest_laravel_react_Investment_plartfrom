<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MonthlyProfit;
use App\Models\Business;
use App\Models\Investment;
use App\Models\InvestorProfit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class MonthlyProfitController extends Controller
{
    // 🟢 Submit a new monthly profit
    public function store(Request $request, Business $business)
    {
        $data = $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000|max:2100',
            'profit_amount' => 'required|numeric|min:0',
            'platform_fee_percent' => 'nullable|numeric|min:0|max:100',
            'proof_file' => 'nullable|file|mimes:pdf,jpg,png,xlsx|max:2048',
        ]);

        if ($request->hasFile('proof_file')) {
            $data['proof_file'] = $request->file('proof_file')->store('proofs', 'public');
        }

        $feePercent = $data['platform_fee_percent'] ?? 5;
        $feeAmount = $data['profit_amount'] * ($feePercent / 100);
        $ownerShare = $data['profit_amount'] - $feeAmount;

        $profit = MonthlyProfit::updateOrCreate(
            [
                'business_id' => $business->id,
                'month' => $data['month'],
                'year' => $data['year'],
            ],
            [
                'profit_amount' => $data['profit_amount'],
                'platform_fee_amount' => $feeAmount,
                'owner_share_amount' => $ownerShare,
                'proof_file' => $data['proof_file'] ?? null,
                'status' => 'pending',
            ]
        );

        return response()->json($profit, 201);
    }

    // 🟣 Admin: approve a profit
    public function approve($id)
{
    \Log::info("🔹 Approve route triggered for MonthlyProfit ID: {$id}");

    $monthlyProfit = MonthlyProfit::with('business.investments.investor')->find($id);

    if (!$monthlyProfit) {
        \Log::error("❌ MonthlyProfit not found with ID {$id}");
        return response()->json(['message' => 'Monthly profit not found.'], 404);
    }

    if ($monthlyProfit->status === 'approved') {
        return response()->json(['message' => 'This profit has already been approved.'], 400);
    }

    $business = $monthlyProfit->business;

    // ✅ Self-heal check for missing business link
    if (!$business) {
        \Log::error("❌ No business associated with profit ID {$id}");
        return response()->json(['message' => 'No business linked to this profit.'], 400);
    }

    $investments = $business->investments()->with('investor')->get();

    if ($investments->isEmpty()) {
        \Log::warning("⚠️ No investments found for business ID {$business->id}");
        return response()->json(['message' => 'No investors found for this business.'], 400);
    }

    // ✅ Mark as approved
    $monthlyProfit->update([
        'status' => 'approved',
        'approved_at' => now(),
    ]);

    $totalInvestment = $investments->sum('amount');
    if ($totalInvestment <= 0) {
        return response()->json(['message' => 'Invalid investment data.'], 400);
    }

    $distributed = [];

    foreach ($investments as $investment) {
        $share = $investment->amount / $totalInvestment;
        $investorProfitAmount = $monthlyProfit->profit_amount * $share;

        \App\Models\InvestorProfit::create([
            'investor_id' => $investment->investor_id,
            'business_id' => $business->id,
            'monthly_profit_id' => $monthlyProfit->id,
            'amount' => $investorProfitAmount,
            'month' => $monthlyProfit->month,
            'year' => $monthlyProfit->year,
        ]);

        $distributed[] = [
            'investor' => $investment->investor->name ?? 'Unknown',
            'amount' => round($investorProfitAmount, 2),
        ];
    }

    \Log::info("✅ Profit ID {$id} approved and distributed to investors.", $distributed);

    return response()->json([
        'message' => '✅ Profit approved and distributed successfully.',
        'distributed' => $distributed,
    ]);
}

    // 🟢 Business owner view
    public function index(Business $business)
    {
        $profits = MonthlyProfit::where('business_id', $business->id)
            ->orderByDesc('year')
            ->orderByDesc('month')
            ->get();

        return response()->json(['data' => $profits]);
    }

    // 🟣 Admin view (all profits)
    public function indexAll()
    {
        $profits = MonthlyProfit::with('business')
            ->orderByDesc('year')
            ->orderByDesc('month')
            ->get();

        return response()->json(['data' => $profits]);
    }

    // 📄 Generate PDF Invoice for a Monthly Profit
    public function downloadInvoice($id)
    {
        $monthlyProfit = MonthlyProfit::with('business')->findOrFail($id);

        $data = [
            'business_name' => $monthlyProfit->business->name ?? 'N/A',
            'month' => $monthlyProfit->month,
            'year' => $monthlyProfit->year,
            'profit_amount' => $monthlyProfit->profit_amount,
            'platform_fee_amount' => $monthlyProfit->platform_fee_amount,
            'owner_share_amount' => $monthlyProfit->owner_share_amount,
            'created_at' => $monthlyProfit->created_at,
        ];

        $pdf = Pdf::loadView('pdf.monthly_invoice', $data);
        $fileName = 'Monthly_Profit_Invoice_'.$monthlyProfit->month.'_'.$monthlyProfit->year.'.pdf';

        return $pdf->download($fileName);
    }
}
