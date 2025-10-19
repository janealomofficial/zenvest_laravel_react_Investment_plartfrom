<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    // Fetch all registered businesses
    public function index()
    {
        $businesses = Business::with('owner')->get();
        return response()->json(['data' => $businesses]);
    }

    // Update a business (admin edits)
    public function update(Request $request, $id)
    {
        $business = Business::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|string|in:pending,approved,rejected',
            'funding_amount' => 'nullable|numeric|min:0',
        ]);

        $business->update($validated);

        return response()->json([
            'message' => 'Business updated successfully',
            'data' => $business,
        ]);
    }

    // Delete a business
    public function destroy($id)
    {
        $business = Business::findOrFail($id);
        $business->delete();

        return response()->json(['message' => 'Business deleted successfully']);
    }
}
