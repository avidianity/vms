<?php

namespace App\Channels;

use Avidian\Semaphore\Client;
use Illuminate\Notifications\Notification;

class SemaphoreChannel
{
    /**
     * @var \Avidian\Semaphore\Client
     */
    public $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * Send the given notification.
     *
     * @param  mixed  $notifiable
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return bool
     */
    public function send($notifiable, Notification $notification)
    {
        $data = method_exists($notification, 'toSemaphore')
            ? $notification->toSemaphore($notifiable)
            : $notification->toArray($notifiable);

        $message = $data['message'];

        $this->client->send($notifiable->phone, $message);

        return true;
    }
}
