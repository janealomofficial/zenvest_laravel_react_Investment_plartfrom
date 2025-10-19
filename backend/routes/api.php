<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ApplicationController;
use App\Http\Controllers\API\InvestmentController;
use App\Http\Controllers\API\UserController;

Route::middleware('auth:api')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

use App\Http\Controllers\API\BusinessController;

Route::middleware('auth:api')->group(function () {
    Route::get('/businesses', [BusinessController::class, 'index']);
    Route::put('/businesses/{id}', [BusinessController::class, 'update']);
    Route::delete('/businesses/{id}', [BusinessController::class, 'destroy']);
});



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
    Route::post('/refresh', 'refresh');
    Route::get('/user', 'me');
});

// Business applications
Route::controller(ApplicationController::class)->group(function () {
    Route::get('/applications', 'index');
    Route::post('/applications', 'store');
    Route::get('/applications/{application}', 'show');
    Route::put('/applications/{application}/approve', 'approve');
    Route::put('/applications/{application}/reject', 'reject');
});

// Investments
Route::controller(InvestmentController::class)->group(function () {
    Route::get('/investments', 'index');
});
