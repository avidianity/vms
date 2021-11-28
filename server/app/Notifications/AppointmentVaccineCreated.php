<?php

namespace App\Notifications;

use App\Models\AppointmentVaccine;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentVaccineCreated extends Notification
{
    use Queueable;

    protected $appointmentVaccine;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(AppointmentVaccine $appointmentVaccine)
    {
        $this->appointmentVaccine = $appointmentVaccine;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'sms', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line(sprintf('Hi %s!', $notifiable->name))
            ->line(sprintf('%s Vaccine has been assigned to your appointment.', $this->appointmentVaccine->vaccine->name))
            ->line(sprintf('Please wait for further notifications on dates to be assigned.'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'message' => sprintf(
                'Hi %s! %s Vaccine has been assigned to your appointment. Please wait for further notifications on dates to be assigned.',
                $notifiable->name,
                $this->appointmentVaccine->vaccine->name,
            )
        ];
    }
}
