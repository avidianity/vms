<?php

namespace Tests\Feature;

use App\Models\Vaccine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Authenticates;
use Tests\TestCase;

class VaccineTest extends TestCase
{
    use WithFaker, RefreshDatabase, Authenticates;

    /**
     * @test
     */
    public function index()
    {
        $this->authenticate();

        $this->getJson(route('v1.vaccines.index'))
            ->assertOk();
    }

    /**
     * @test
     */
    public function show()
    {
        $this->authenticate();

        $vaccine = Vaccine::factory()->create();

        $this->getJson(route('v1.vaccines.show', ['vaccine' => $vaccine->id]))
            ->assertJson($vaccine->toArray());
    }

    /**
     * @test
     */
    public function store()
    {
        $this->authenticate();

        $data = Vaccine::factory()->make()->toArray();

        $response = $this->postJson(route('v1.vaccines.store'), $data)
            ->assertCreated();

        $this->assertDatabaseHas(Vaccine::class, ['id' => $response->json('id')]);
    }

    /**
     * @test
     */
    public function update()
    {
        $this->authenticate();

        $vaccine = Vaccine::factory()->create();

        $data = Vaccine::factory()->make()->toArray();

        $this->putJson(route('v1.vaccines.update', ['vaccine' => $vaccine->id]), $data)
            ->assertJson(Vaccine::findOrFail($vaccine->id)->toArray());
    }

    /**
     * @test
     */
    public function destroy()
    {
        $this->authenticate();

        $vaccine = Vaccine::factory()->create();

        $this->deleteJson(route('v1.vaccines.destroy', ['vaccine' => $vaccine->id]))
            ->assertNoContent();

        $this->assertDatabaseMissing(Vaccine::class, ['id' => $vaccine->id]);
    }
}
