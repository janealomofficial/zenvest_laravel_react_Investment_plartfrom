<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApplicationResource;
use App\Models\BusinessApplication;
use App\Models\Investment;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of applications.
     */
    public function index()
    {
        $user = auth()->user();

        if (in_array($user->role, ['investor', 'admin'])) {
            $applications = BusinessApplication::with('user')->get();
        } else {
            $applications = $user->applications()->with('user')->get();
        }

        return ApplicationResource::collection($applications);
    }

    /**
     * Store a newly created application.
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        if ($user->role !== 'business_owner') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // ✅ Updated validation with new fields
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'revenue' => 'nullable|numeric',
            'profit' => 'nullable|numeric',
            'funding_amount' => 'required|numeric',
            'investor_share' => 'required|numeric|min:0|max:100',
            'platform_fee' => 'required|numeric|min:0|max:100',
            'pitch_deck' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        // ✅ Handle optional pitch deck file upload
        $fileName = null;
        if ($request->hasFile('pitch_deck')) {
            $fileName = $request->file('pitch_deck')->store('pitch_decks');
        }

        // ✅ Create new Business Application record
        $application = BusinessApplication::create([
            'user_id' => $user->id,
            'business_name' => $validated['business_name'],
            'description' => $validated['description'] ?? null,
            'category' => $validated['category'] ?? null,
            'revenue' => $validated['revenue'] ?? null,
            'profit' => $validated['profit'] ?? null,
            'funding_amount' => $validated['funding_amount'],
            'investor_share' => $validated['investor_share'],
            'platform_fee' => $validated['platform_fee'],
            'pitch_deck' => $fileName,
            'status' => 'pending',
        ]);

        // ✅ Create or update related Business entry
        Business::updateOrCreate(
            ['name' => $validated['business_name']],
            [
                'user_id' => $user->id,
                'description' => $validated['description'] ?? null,
                'funding_amount' => $validated['funding_amount'],
                'status' => 'pending',
                'investor_share' => $validated['investor_share'],
                'platform_fee' => $validated['platform_fee'],
            ]
        );

        return new ApplicationResource($application);
    }

    /**
     * Show a single application.
     */
    public function show(BusinessApplication $application)
    {
        $user = auth()->user();

        if (in_array($user->role, ['investor', 'admin']) || $user->id === $application->user_id) {
            return new ApplicationResource($application->load('user'));
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }

    /**
     * Approve an application.
     */
    public function approve(BusinessApplication $application)
    {
        $user = auth()->user();

        if (!in_array($user->role, ['investor', 'admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($application->status !== 'pending') {
            return response()->json(['message' => 'Application already processed'], 422);
        }

        // ✅ Update application status
        $application->status = 'approved';
        $application->save();

        // ✅ Create Investment record linked to this application
        Investment::create([
            'investor_id' => $user->id,
            'application_id' => $application->id,
            'amount' => $application->funding_amount,
            'investment_date' => now()->toDateString(),
            'status' => 'active',
            'profit' => null,
        ]);

        // ✅ Sync Business status
        Business::where('name', $application->business_name)
            ->update(['status' => 'approved']);

        return new ApplicationResource($application->load('user'));
    }

    /**
     * Reject an application.
     */
    public function reject(BusinessApplication $application)
    {
        $user = auth()->user();

        if (!in_array($user->role, ['investor', 'admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($application->status !== 'pending') {
            return response()->json(['message' => 'Application already processed'], 422);
        }

        // ✅ Update application status
        $application->status = 'rejected';
        $application->save();

        // ✅ Sync Business status
        Business::where('name', $application->business_name)
            ->update(['status' => 'rejected']);

        return new ApplicationResource($application->load('user'));
    }

    /**
     * Dashboard summary for admin or investor
     */
    public function summary()
{
    $user = auth()->user();

    // 🟦 ADMIN VIEW
    if ($user->role === 'admin') {
        $totalInvestorProfit = \App\Models\InvestorProfit::sum('amount');
        $platformRevenue = \App\Models\MonthlyProfit::sum('platform_fee_amount');

        return response()->json([
            'role' => 'admin',
            'total_investor_profit' => round($totalInvestorProfit, 2),
            'platform_revenue' => round($platformRevenue, 2),
        ]);
    }

    // 🟩 INVESTOR VIEW
    if ($user->role === 'investor') {
        $myProfit = \App\Models\InvestorProfit::where('investor_id', $user->id)->sum('amount');

        return response()->json([
            'role' => 'investor',
            'my_profit' => round($myProfit, 2),
        ]);
    }

    // 🟧 BUSINESS OWNER VIEW (optional)
    if ($user->role === 'business_owner') {
        $myBusiness = \App\Models\Business::where('user_id', $user->id)->pluck('id');
        $myBusinessProfit = \App\Models\MonthlyProfit::whereIn('business_id', $myBusiness)->sum('owner_share_amount');

        return response()->json([
            'role' => 'business_owner',
            'my_business_profit' => round($myBusinessProfit, 2),
        ]);
    }

    // Default fallback
    return response()->json(['message' => 'Not available for this role.'], 403);
}

}
