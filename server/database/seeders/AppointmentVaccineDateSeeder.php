<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\AppointmentVaccine;
use App\Models\AppointmentVaccineDate;
use App\Models\User;
use App\Models\Vaccine;
use Illuminate\Database\Seeder;

class AppointmentVaccineDateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AppointmentVaccineDate::factory(100)
            ->for(
                AppointmentVaccine::factory()
                    ->for(Vaccine::factory())
                    ->for(Appointment::factory()->for(User::factory()->asUser()))
            )
            ->create();
    }
}
