<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Investment;
use App\Models\MonthlyProfit;
use Illuminate\Http\Request;

class ProfitController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'investment_id' => 'required|exists:investments,id',
            'profit_amount' => 'required|numeric|min:0',
            'month' => 'required|date_format:Y-m-d',
        ]);

        $investment = Investment::with('application')->findOrFail($validated['investment_id']);
        $application = $investment->application;

        // Calculate shares
        $investorShare = ($validated['profit_amount'] * $application->investor_share) / 100;
        $platformFee = ($validated['profit_amount'] * $application->platform_fee) / 100;

        MonthlyProfit::create([
            'investment_id' => $investment->id,
            'profit_amount' => $validated['profit_amount'],
            'investor_share_amount' => $investorShare,
            'platform_fee_amount' => $platformFee,
            'month' => $validated['month'],
        ]);

        return response()->json([
            'message' => 'Profit distributed successfully',
            'investor_share' => $investorShare,
            'platform_fee' => $platformFee,
        ]);
    }
}
