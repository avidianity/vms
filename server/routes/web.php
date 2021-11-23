<?php

use App\Http\Requests\SMSVerificationRequest;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['signed', 'auth:sanctum'])->group(function () {
    Route::get('/auth/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        $request->user()->currentAccessToken()->delete();
        return redirect(frontend('/login'));
    })->name('verification.verify');

    Route::get('/auth/verify/sms/{id}/{hash}', function (SMSVerificationRequest $request) {
        $request->fulfill();
        $request->user()->currentAccessToken()->delete();
        return redirect(frontend('/login'));
    })->name('verification.sms.verify');
});
