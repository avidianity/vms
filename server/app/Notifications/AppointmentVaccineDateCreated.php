<?php

namespace App\Notifications;

use App\Models\AppointmentVaccineDate;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;

class AppointmentVaccineDateCreated extends Notification
{
    protected $appointmentVaccineDate;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(AppointmentVaccineDate $appointmentVaccineDate)
    {
        $this->appointmentVaccineDate = $appointmentVaccineDate;
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
            ->line(sprintf(
                'A date has been assigned to your appointment for %s Vaccine at %s.',
                $this->appointmentVaccineDate->appointmentVaccine->vaccine->name,
                Carbon::parse($this->appointmentVaccineDate->date)->toFormattedDateString()
            ));
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
                'Hi %s! A date has been assigned to your appointment for %s Vaccine at %s. Thank you!',
                $notifiable->name,
                $this->appointmentVaccineDate->appointmentVaccine->vaccine->name,
                Carbon::parse($this->appointmentVaccineDate->date)->toFormattedDateString()
            )
        ];
    }
}
