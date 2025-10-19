<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApplicationResource;
use App\Models\BusinessApplication;
use App\Models\Investment;
use App\Models\Business; // ✅ Added this line
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

        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'revenue' => 'nullable|numeric',
            'profit' => 'nullable|numeric',
            'funding_amount' => 'required|numeric',
            'pitch_deck' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $fileName = null;
        if ($request->hasFile('pitch_deck')) {
            $fileName = $request->file('pitch_deck')->store('pitch_decks');
        }

        $application = BusinessApplication::create([
            'user_id' => $user->id,
            'business_name' => $validated['business_name'],
            'description' => $validated['description'] ?? null,
            'category' => $validated['category'] ?? null,
            'revenue' => $validated['revenue'] ?? null,
            'profit' => $validated['profit'] ?? null,
            'funding_amount' => $validated['funding_amount'],
            'pitch_deck' => $fileName,
            'status' => 'pending',
        ]);

        // ✅ Also create or update related Business
        Business::updateOrCreate(
            ['name' => $validated['business_name']],
            [
                'user_id' => $user->id,
                'description' => $validated['description'] ?? null,
                'funding_amount' => $validated['funding_amount'],
                'status' => 'pending',
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

        $application->status = 'approved';
        $application->save();

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

        $application->status = 'rejected';
        $application->save();

        // ✅ Sync Business status
        Business::where('name', $application->business_name)
            ->update(['status' => 'rejected']);

        return new ApplicationResource($application->load('user'));
    }
}
