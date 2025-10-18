<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display all users (admin only)
     */
    public function index()
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::orderBy('created_at', 'desc')->get();

        return UserResource::collection($users);
    }

    /**
     * Update a user's role (admin only)
     */
    public function update(Request $request, $id)
    {
        $admin = auth()->user();
        if (!$admin || $admin->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'role' => 'required|in:admin,investor,business_owner',
        ]);

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->role = $request->role;
        $user->save();

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Delete a user (admin only)
     */
    public function destroy($id)
    {
        $admin = auth()->user();
        if (!$admin || $admin->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
