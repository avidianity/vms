<?php

namespace Tests\Feature;

use App\Models\Appointment;
use App\Models\AppointmentVaccine;
use App\Models\User;
use App\Models\Vaccine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Authenticates;
use Tests\TestCase;

class AppointmentVaccineTest extends TestCase
{
    use WithFaker, RefreshDatabase, Authenticates;

    /**
     * @test
     */
    public function index()
    {
        $this->authenticate();

        $this->getJson(route('v1.appointment-vaccines.index'))
            ->assertOk();
    }

    /**
     * @test
     */
    public function show()
    {
        $this->authenticate();

        $appointmentVaccine = AppointmentVaccine::factory()
            ->for(Vaccine::factory())
            ->for(Appointment::factory()->for(User::factory()->asUser()))
            ->create();

        $this->getJson(route('v1.appointment-vaccines.show', ['appointment_vaccine' => $appointmentVaccine->id]))
            ->assertJson($appointmentVaccine->toArray());
    }

    /**
     * @test
     */
    public function store()
    {
        $this->authenticate();

        $data = AppointmentVaccine::factory()
            ->for(Vaccine::factory())
            ->for(Appointment::factory()->for(User::factory()->asUser()))
            ->make()
            ->toArray();

        $response = $this->postJson(route('v1.appointment-vaccines.store'), $data)
            ->assertCreated();

        $this->assertDatabaseHas(AppointmentVaccine::class, ['id' => $response->json('id')]);
    }

    /**
     * @test
     */
    public function update()
    {
        $this->authenticate();

        $appointmentVaccine = AppointmentVaccine::factory()
            ->for(Vaccine::factory())
            ->for(Appointment::factory()->for(User::factory()->asUser()))
            ->create();

        $data = AppointmentVaccine::factory()->make()->toArray();

        $this->putJson(route('v1.appointment-vaccines.update', ['appointment_vaccine' => $appointmentVaccine->id]), $data)
            ->assertJson(AppointmentVaccine::findOrFail($appointmentVaccine->id)->toArray());
    }

    /**
     * @test
     */
    public function destroy()
    {
        $this->authenticate();

        $appointmentVaccine = AppointmentVaccine::factory()
            ->for(Vaccine::factory())
            ->for(Appointment::factory()->for(User::factory()->asUser()))
            ->create();

        $this->deleteJson(route('v1.appointment-vaccines.destroy', ['appointment_vaccine' => $appointmentVaccine->id]))
            ->assertNoContent();

        $this->assertDatabaseMissing(AppointmentVaccine::class, ['id' => $appointmentVaccine->id]);
    }
}
