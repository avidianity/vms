<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AnnouncementSeeder::class);
        $this->call(AppointmentSeeder::class);
        $this->call(AppointmentVaccineDateSeeder::class);
        $this->call(AppointmentVaccineSeeder::class);
        $this->call(VaccineSeeder::class);

        User::factory()->create(['role' => User::ADMIN, 'email' => 'admin@gmail.com', 'phone' => '+639169258735', 'password' => 'admin']);
    }
}
