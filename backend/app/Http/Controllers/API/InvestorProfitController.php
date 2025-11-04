<?php

namespace App\Http\Controllers\API;

use App\Models\InvestorProfit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InvestorProfitController extends Controller
{
    /**
     * Fetch all profits for the logged-in investor,
     * including total earnings and related business info.
     */
    public function index(Request $request)
    {
        $investorId = $request->user()->id;

        // Fetch profits with related business and monthly profit data
        $profits = InvestorProfit::with(['business', 'monthlyProfit'])
            ->where('investor_id', $investorId)
            ->orderByDesc('year')
            ->orderByDesc('month')
            ->get();

        // Calculate total earnings
        $totalEarnings = $profits->sum('amount');

        // Return structured JSON response
        return response()->json([
            'success' => true,
            'total_earnings' => $totalEarnings,
            'profits' => $profits,
        ]);
    }
}
