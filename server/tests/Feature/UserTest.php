<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Authenticates;
use Tests\TestCase;

class UserTest extends TestCase
{
    use WithFaker, RefreshDatabase, Authenticates;

    /**
     * @test
     */
    public function index()
    {
        $this->authenticate();

        $this->getJson(route('v1.users.index'))
            ->assertOk();
    }

    /**
     * @test
     */
    public function show()
    {
        $this->authenticate();

        $user = User::factory()->create();

        $this->getJson(route('v1.users.show', ['user' => $user->id]))
            ->assertJson($user->toArray());
    }

    /**
     * @test
     */
    public function store()
    {
        $this->authenticate();

        $data = user::factory()->make()->toArray();
        $data['password'] = $this->faker->password;

        $response = $this->postJson(route('v1.users.store'), $data)
            ->assertCreated();

        $this->assertDatabaseHas(User::class, ['id' => $response->json('id')]);
    }

    /**
     * @test
     */
    public function update()
    {
        $this->authenticate();

        $user = User::factory()->create();

        $data = User::factory()->make()->toArray();

        $this->putJson(route('v1.users.update', ['user' => $user->id]), $data)
            ->assertJson(User::findOrFail($user->id)->toArray());
    }

    /**
     * @test
     */
    public function destroy()
    {
        $this->authenticate();

        $user = User::factory()->create();

        $this->deleteJson(route('v1.users.destroy', ['user' => $user->id]))
            ->assertNoContent();

        $this->assertDatabaseMissing(User::class, ['id' => $user->id]);
    }
}
