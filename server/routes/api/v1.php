<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AppointmentVaccineController;
use App\Http\Controllers\AppointmentVaccineDateController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VaccineController;
use Illuminate\Support\Facades\Route;

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

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/check', [AuthController::class, 'check'])->name('auth.check');

    Route::apiResource('announcements', AnnouncementController::class);
    Route::apiResources([
        'appointments' => AppointmentController::class,
        'appointment-vaccines' => AppointmentVaccineController::class,
        'appointment-vaccine-dates' => AppointmentVaccineDateController::class,
        'users' => UserController::class,
        'vaccines' => VaccineController::class,
    ]);
});
