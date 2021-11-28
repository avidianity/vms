<?php

namespace Tests;

use App\Models\User;
use Laravel\Sanctum\Sanctum;

trait Authenticates
{
    protected function authenticate($role = User::ADMIN)
    {
        /**
         * @var \App\Models\User
         */
        $user = User::factory()->create(['role' => $role]);

        Sanctum::actingAs($user);

        return $user;
    }
}
