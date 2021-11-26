<?php

namespace Tests\Feature;

use App\Models\Appointment;
use App\Models\AppointmentVaccine;
use App\Models\AppointmentVaccineDate;
use App\Models\User;
use App\Models\Vaccine;
use App\Notifications\AppointmentVaccineDateCreated;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\Authenticates;
use Tests\TestCase;

class AppointmentVaccineDateTest extends TestCase
{
    use WithFaker, RefreshDatabase, Authenticates;

    /**
     * @test
     */
    public function index()
    {
        $this->authenticate();

        $this->getJson(route('v1.appointment-vaccine-dates.index'))
            ->assertOk();
    }

    /**
     * @test
     */
    public function show()
    {
        $this->authenticate();

        $appointmentVaccineDate = AppointmentVaccineDate::factory()
            ->for(
                AppointmentVaccine::factory()
                    ->for(Vaccine::factory())
                    ->for(Appointment::factory()->for(User::factory()->asUser()))
            )
            ->create();

        $this->getJson(route('v1.appointment-vaccine-dates.show', ['appointment_vaccine_date' => $appointmentVaccineDate->id]))
            ->assertJson($appointmentVaccineDate->toArray());
    }

    /**
     * @test
     */
    public function store()
    {
        $this->authenticate();

        $user = User::factory()->asUser()->create();

        $data = AppointmentVaccineDate::factory()
            ->for(
                AppointmentVaccine::factory()
                    ->for(Vaccine::factory())
                    ->for(Appointment::factory()->for($user))
            )
            ->make()
            ->toArray();

        Notification::fake();

        $response = $this->postJson(route('v1.appointment-vaccine-dates.store'), $data)
            ->assertCreated();

        $this->assertDatabaseHas(AppointmentVaccineDate::class, ['id' => $response->json('id')]);

        Notification::assertSentTo($user, AppointmentVaccineDateCreated::class);
    }

    /**
     * @test
     */
    public function update()
    {
        $this->authenticate();

        $appointmentVaccineDate = AppointmentVaccineDate::factory()
            ->for(
                AppointmentVaccine::factory()
                    ->for(Vaccine::factory())
                    ->for(Appointment::factory()->for(User::factory()->asUser()))
            )
            ->create();

        $data = AppointmentVaccineDate::factory()->make()->toArray();

        $this->putJson(route('v1.appointment-vaccine-dates.update', ['appointment_vaccine_date' => $appointmentVaccineDate->id]), $data)
            ->assertJson(AppointmentVaccineDate::findOrFail($appointmentVaccineDate->id)->toArray());
    }

    /**
     * @test
     */
    public function destroy()
    {
        $this->authenticate();

        $appointmentVaccineDate = AppointmentVaccineDate::factory()
            ->for(
                AppointmentVaccine::factory()
                    ->for(Vaccine::factory())
                    ->for(Appointment::factory()->for(User::factory()->asUser()))
            )
            ->create();

        $this->deleteJson(route('v1.appointment-vaccine-dates.destroy', ['appointment_vaccine_date' => $appointmentVaccineDate->id]))
            ->assertNoContent();

        $this->assertDatabaseMissing(AppointmentVaccineDate::class, ['id' => $appointmentVaccineDate->id]);
    }
}
