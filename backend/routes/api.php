<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ApplicationController;
use App\Http\Controllers\API\InvestmentController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\BusinessController;
use App\Http\Controllers\API\MonthlyProfitController;
use App\Http\Controllers\API\InvestorProfitController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| All routes for your application are defined here.
| Sanctum has been removed since you're using JWT for authentication.
| These routes are protected using the 'auth:api' middleware.
|
*/

Route::post('/monthly-profits/{id}/approve', [MonthlyProfitController::class, 'approve']);
Route::get('/monthly-profits/{id}/invoice', [App\Http\Controllers\API\MonthlyProfitController::class, 'downloadInvoice']);



// 🧾 Authentication routes
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
    Route::post('/refresh', 'refresh');
    Route::get('/user', 'me');
});

// 🏢 Business application routes
Route::controller(ApplicationController::class)->group(function () {
    Route::get('/applications', 'index');
    Route::post('/applications', 'store');
    Route::get('/applications/{application}', 'show');
    Route::put('/applications/{application}/approve', 'approve');
    Route::put('/applications/{application}/reject', 'reject');
});

// 💸 Investment routes
Route::controller(InvestmentController::class)->group(function () {
    Route::get('/investments', 'index');
});

// 📊 Dashboard summary (protected)
Route::middleware('auth:api')->get('/dashboard/summary', [ApplicationController::class, 'summary']);

// 👤 User management (Admin)
Route::middleware(['auth:api'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

// 🏬 Business management
Route::middleware(['auth:api'])->group(function () {
    Route::get('/businesses', [BusinessController::class, 'index']);
    Route::put('/businesses/{id}', [BusinessController::class, 'update']);
    Route::delete('/businesses/{id}', [BusinessController::class, 'destroy']);
});

// 💰 Monthly Profits (Business Owners)
Route::middleware(['auth:api'])->group(function () {
    Route::post('/businesses/{business}/profits', [MonthlyProfitController::class, 'store']);
    Route::get('/monthly-profits', [MonthlyProfitController::class, 'index']);
});

// 👑 Admin-only: Profit Approval
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::get('/monthly-profits', [MonthlyProfitController::class, 'indexAll']);
    Route::post('/monthly-profits/{id}/approve', [MonthlyProfitController::class, 'approve']);
});

// 💼 Investor Dashboard: Profits
Route::middleware(['auth:api', 'role:investor'])->group(function () {
    Route::get('/investor-profits', [InvestorProfitController::class, 'index']);
});
