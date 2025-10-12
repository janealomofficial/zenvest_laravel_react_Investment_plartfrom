<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * RoleMiddleware restricts access to routes based on the authenticated
 * user's role. Usage: ->middleware('role:investor,admin') will allow
 * only investors or admins to hit the route. We currently rely on
 * explicit checks within controllers, but this middleware is provided
 * as an example and can be used in the future if desired.
 */
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();
        if (!$user || !in_array($user->role, $roles)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return $next($request);
    }
}