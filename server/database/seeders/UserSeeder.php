<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create(['role' => User::ADMIN, 'email' => 'admin@gmail.com', 'phone' => '+639169258735', 'password' => 'admin']);
    }
}
