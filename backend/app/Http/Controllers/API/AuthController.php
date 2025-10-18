<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

/**
 * AuthController handles user registration, login, logout and token refresh using JWT.
 * The middleware protects all endpoints except login and register.
 */
class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Register a new user. Accepts name, email, password and role.
     * The role should be either 'admin', 'investor', or 'business_owner'.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:admin,investor,business_owner',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => new UserResource($user),
        ], 201);
    }

    /**
     * Authenticate a user and return the JWT token.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt login
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = auth()->user();

        // ✅ Allow admin, investor, and business_owner roles
        if (!in_array($user->role, ['admin', 'investor', 'business_owner'])) {
            auth()->logout();
            return response()->json(['message' => 'Unauthorized role'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Log the user out (invalidate the token).
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh an expired token and return a new one.
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Return the current authenticated user.
     */
    public function me()
    {
        return new UserResource(auth()->user());
    }

    /**
     * Structure the token response with expiration information and user data.
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => new UserResource(auth()->user()),
        ]);
    }
}
