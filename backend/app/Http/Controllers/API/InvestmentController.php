<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvestmentResource;
use App\Models\Investment;
use App\Models\BusinessApplication;
use Illuminate\Http\Request;

/**
 * InvestmentController allows investors to view and create their investments.
 */
class InvestmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the authenticated investor's investments.
     * Admins may view all investments.
     */
    public function index()
    {
        $user = auth()->user();

        if (in_array($user->role, ['admin'])) {
            $investments = Investment::with(['investor', 'application.user', 'business'])->get();
        } else {
            $investments = $user->investments()->with(['investor', 'application.user', 'business'])->get();
        }

        return InvestmentResource::collection($investments);
    }

    /**
     * Store a newly created investment in the database.
     * Automatically links the investment with the correct business_id.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'application_id' => 'required|exists:business_applications,id',
            'amount' => 'required|numeric|min:1',
        ]);

        $user = auth()->user();

        // ✅ Find the related business from the application
        $application = BusinessApplication::find($data['application_id']);

        if (!$application || !$application->business_id) {
            return response()->json([
                'message' => 'Business not found for this application.'
            ], 400);
        }

        // ✅ Automatically link the business
        $investment = Investment::create([
            'investor_id' => $user->id,
            'business_id' => $application->business_id,
            'application_id' => $data['application_id'],
            'amount' => $data['amount'],
            'investment_date' => now(),
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Investment created successfully!',
            'data' => new InvestmentResource($investment->load(['investor', 'application.user', 'business'])),
        ], 201);
    }
}
