<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\AppointmentVaccine;
use App\Models\User;
use App\Models\Vaccine;
use Illuminate\Database\Seeder;

class AppointmentVaccineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AppointmentVaccine::factory(25)
            ->for(Vaccine::factory())
            ->for(Appointment::factory()->for(User::factory()->asUser()))
            ->create();
    }
}
