<?php

namespace Tests\Feature;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Authenticates;
use Tests\TestCase;

class AppointmentTest extends TestCase
{
    use WithFaker, RefreshDatabase, Authenticates;

    /**
     * @test
     */
    public function index()
    {
        $this->authenticate();

        $this->getJson(route('v1.appointments.index'))
            ->assertOk();
    }

    /**
     * @test
     */
    public function show()
    {
        $this->authenticate();

        $appointment = Appointment::factory()
            ->for(User::factory()->asUser())
            ->create();

        $this->getJson(route('v1.appointments.show', ['appointment' => $appointment->id]))
            ->assertJson($appointment->toArray());
    }

    /**
     * @test
     */
    public function store()
    {
        $this->authenticate();

        $data = Appointment::factory()
            ->for(User::factory()->asUser())
            ->make()
            ->toArray();

        $response = $this->postJson(route('v1.appointments.store'), $data)
            ->assertCreated();

        $this->assertDatabaseHas(Appointment::class, ['id' => $response->json('id')]);
    }

    /**
     * @test
     */
    public function update()
    {
        $this->authenticate();

        $appointment = Appointment::factory()
            ->for(User::factory()->asUser())
            ->create();

        $data = Appointment::factory()->make()->toArray();

        $this->putJson(route('v1.appointments.update', ['appointment' => $appointment->id]), $data)
            ->assertJson(Appointment::findOrFail($appointment->id)->toArray());
    }

    /**
     * @test
     */
    public function destroy()
    {
        $this->authenticate();

        $appointment = Appointment::factory()
            ->for(User::factory()->asUser())
            ->create();

        $this->deleteJson(route('v1.appointments.destroy', ['appointment' => $appointment->id]))
            ->assertNoContent();

        $this->assertDatabaseMissing(Appointment::class, ['id' => $appointment->id]);
    }

    /**
     * @test
     */
    public function search()
    {
        $this->authenticate();

        $appointment = Appointment::factory()
            ->for(User::factory()->asUser())
            ->create();

        $this->getJson(route('v1.search.appointments', ['keyword' => $appointment->child]))
            ->assertJson([$appointment->toArray()]);
    }
}
