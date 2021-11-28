<?php

namespace Database\Seeders;

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
        $this->call(UserSeeder::class);
        $this->call(VaccineSeeder::class);
    }
}
