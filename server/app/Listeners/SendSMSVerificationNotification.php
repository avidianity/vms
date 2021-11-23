<?php

namespace App\Listeners;

use App\Notifications\VerifySMS;
use Avidian\Semaphore\Client;

class SendSMSVerificationNotification
{
    protected $client;

    /**
     * Create the event listener.
     *
     * @param \Avidian\Semaphore\Client
     * @return void
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Registered  $event
     * @return void
     */
    public function handle($event)
    {
        $event->user->notify(new VerifySMS);
    }
}
