<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(AuthLoginRequest $request)
    {
        $data = $request->only(['key', 'username', 'password']);

        $user = User::where($data['key'], $data['username'])->firstOrFail();

        if (!$user->email_verified_at) {
            return response(['message' => 'Account is not verified.'], 403);
        }

        if (!Hash::check($data['password'], $user->password)) {
            return response(['message' => 'Password is incorrect.'], 403);
        }

        $token = $user->createToken($request->userAgent() ?? 'NONE');

        return [
            'user' => $user,
            'token' => $token->plainTextToken,
        ];
    }

    public function register(AuthRegisterRequest $request)
    {
        $user = User::create($request->validated() + ['role' => User::USER]);

        event(new Registered($user));

        return response('', 204);
    }

    public function check(Request $request)
    {
        return $request->user();
    }

    public function logout(Request $request)
    {
        $request->user('sanctum')?->currentAccessToken()?->delete();

        return response('', 204);
    }

    public function notifications(Request $request)
    {
        return $request->user()->notifications;
    }
}
