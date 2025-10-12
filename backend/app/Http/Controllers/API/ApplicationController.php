<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApplicationResource;
use App\Models\BusinessApplication;
use App\Models\Investment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * ApplicationController handles creating and managing business applications.
 * Business owners can submit new applications, while investors can view,
 * approve or reject applications.
 */
class ApplicationController extends Controller
{
    public function __construct()
    {
        // Protect all routes using JWT auth. Specific role checks are performed
        // inside each controller method.
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of applications. Only investors and admins may see all
     * applications; business owners can see only their own.
     */
    public function index()
    {
        $user = auth()->user();
        if (in_array($user->role, ['investor', 'admin'])) {
            $applications = BusinessApplication::with('user')->get();
        } else {
            // Return only the current user's applications
            $applications = $user->applications()->with('user')->get();
        }
        return ApplicationResource::collection($applications);
    }

    /**
     * Store a newly created application. Only business owners can apply for
     * funding.
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

        // Handle optional pitch deck file upload
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

        return new ApplicationResource($application);
    }

    /**
     * Display a single application. Investors can view any application,
     * business owners can view their own.
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
     * Approve an application. Only investors or admins may approve. When an
     * application is approved we create a corresponding investment record.
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

        // Mark as approved
        $application->status = 'approved';
        $application->save();

        // Create investment for the full funding amount. An investor could
        // potentially specify an amount, but for simplicity we assume the full
        // amount requested is invested when approving.
        Investment::create([
            'investor_id' => $user->id,
            'application_id' => $application->id,
            'amount' => $application->funding_amount,
            'investment_date' => now()->toDateString(),
            'status' => 'active',
            'profit' => null,
        ]);

        return new ApplicationResource($application->load('user'));
    }

    /**
     * Reject an application. Only investors or admins may reject.
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
        return new ApplicationResource($application->load('user'));
    }
}