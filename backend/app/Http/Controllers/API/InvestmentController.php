<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvestmentResource;
use App\Models\Investment;

/**
 * InvestmentController allows investors to view the investments they have made.
 */
class InvestmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the authenticated investor's investments. Admins may
     * view all investments.
     */
    public function index()
    {
        $user = auth()->user();
        if (in_array($user->role, ['admin'])) {
            $investments = Investment::with(['investor', 'application.user'])->get();
        } else {
            $investments = $user->investments()->with(['investor', 'application.user'])->get();
        }
        return InvestmentResource::collection($investments);
    }
}