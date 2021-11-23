<?php

namespace Tests\Feature;

use App\Models\User;
use App\Notifications\VerifySMS;
use App\Notifications\VerifyEmail;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * @test
     */
    public function it_should_return_a_user()
    {
        /**
         * @var \App\Models\User
         */
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum');

        $this->get(route('v1.auth.check'))
            ->assertJsonStructure(['id'])
            ->assertOk();
    }

    /**
     * @test
     */
    public function it_should_log_a_user_in()
    {
        $data = ['email' => $this->faker->safeEmail, 'password' => $this->faker->password];

        User::factory()->create($data);

        $this->post(route('v1.auth.login'), $data, ['Accept' => 'application/json'])
            ->assertJsonStructure([
                'token', 'user'
            ])
            ->assertOk();
    }

    /**
     * @test
     */
    public function it_should_register_a_user()
    {
        $password = $this->faker->password;

        $data = [
            'name' => $this->faker->firstName,
            'email' => $this->faker->safeEmail,
            'phone' => '+639' . $this->faker->numberBetween(111111111, 999999999),
            'password' => $password,
            'password_confirmation' => $password,
        ];

        Notification::fake();

        $this->post(route('v1.auth.register'), $data, ['Accept' => 'application/json'])
            ->assertNoContent();

        $user = User::firstOrFail();

        Notification::assertSentTo($user, VerifyEmail::class);
        Notification::assertSentTo($user, VerifySMS::class);
    }

    /**
     * @test
     */
    public function it_verifies_a_user_email()
    {
        /**
         * @var \App\Models\User
         */
        $user = User::factory()
            ->unverified()
            ->create();

        Event::fake();

        $route =  URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(config('auth.verification.expire', 60)),
            [
                'id' => $user->getKey(),
                'hash' => sha1($user->getEmailForVerification()),
                'token' => $user->createToken(Str::random(5))->plainTextToken,
            ]
        );

        $this->get($route)
            ->assertRedirect(frontend('/login'));

        Event::assertDispatched(Verified::class);

        $this->assertTrue($user->fresh()->hasVerifiedEmail());
    }

    /**
     * @test
     */
    public function it_verifies_a_user_sms()
    {
        /**
         * @var \App\Models\User
         */
        $user = User::factory()
            ->unverified()
            ->create();

        Event::fake();

        $route =  URL::temporarySignedRoute(
            'verification.sms.verify',
            now()->addMinutes(config('auth.verification.expire', 60)),
            [
                'id' => $user->getKey(),
                'hash' => sha1($user->phone),
                'token' => $user->createToken(Str::random(5))->plainTextToken,
            ]
        );

        $this->get($route)
            ->assertRedirect(frontend('/login'));

        Event::assertDispatched(Verified::class);

        $this->assertTrue($user->fresh()->hasVerifiedEmail());
    }
}
