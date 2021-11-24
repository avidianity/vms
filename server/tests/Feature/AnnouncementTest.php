<?php

namespace Tests\Feature;

use App\Models\Announcement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Authenticates;
use Tests\TestCase;

class AnnouncementTest extends TestCase
{
    use WithFaker, RefreshDatabase, Authenticates;

    /**
     * @test
     */
    public function index()
    {
        $this->authenticate();

        $this->getJson(route('v1.announcements.index'))
            ->assertOk();
    }

    /**
     * @test
     */
    public function show()
    {
        $this->authenticate();

        $announcement = Announcement::factory()->create();

        $this->getJson(route('v1.announcements.show', ['announcement' => $announcement->id]))
            ->assertJson($announcement->toArray());
    }

    /**
     * @test
     */
    public function store()
    {
        $this->authenticate();

        $data = Announcement::factory()->make()->toArray();

        $response = $this->postJson(route('v1.announcements.store'), $data)
            ->assertCreated();

        $this->assertDatabaseHas(Announcement::class, ['id' => $response->json('id')]);
    }

    /**
     * @test
     */
    public function update()
    {
        $this->authenticate();

        $announcement = Announcement::factory()->create();

        $data = Announcement::factory()->make()->toArray();

        $this->putJson(route('v1.announcements.update', ['announcement' => $announcement->id]), $data)
            ->assertJson(Announcement::findOrFail($announcement->id)->toArray());
    }

    /**
     * @test
     */
    public function destroy()
    {
        $this->authenticate();

        $announcement = Announcement::factory()->create();

        $this->deleteJson(route('v1.announcements.destroy', ['announcement' => $announcement->id]))
            ->assertNoContent();

        $this->assertDatabaseMissing(Announcement::class, ['id' => $announcement->id]);
    }
}
