<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Announcement
 *
 * @method static \Database\Factories\AnnouncementFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement query()
 */
	class Announcement extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Appointment
 *
 * @property-read \App\Models\User $attendee
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AppointmentVaccine[] $vaccines
 * @property-read int|null $vaccines_count
 * @method static \Database\Factories\AppointmentFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment query()
 */
	class Appointment extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AppointmentVaccine
 *
 * @property-read \App\Models\Appointment $appointment
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AppointmentVaccineDate[] $appointmentDates
 * @property-read int|null $appointment_dates_count
 * @property-read \App\Models\Vaccine $vaccine
 * @method static \Database\Factories\AppointmentVaccineFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine query()
 */
	class AppointmentVaccine extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AppointmentVaccineDate
 *
 * @property-read \App\Models\AppointmentVaccine $appointmentVaccine
 * @method static \Database\Factories\AppointmentVaccineDateFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate query()
 */
	class AppointmentVaccineDate extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Appointment[] $appointments
 * @property-read int|null $appointments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Appointment[] $assigns
 * @property-read int|null $assigns_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Vaccine
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AppointmentVaccine[] $appointments
 * @property-read int|null $appointments_count
 * @method static \Database\Factories\VaccineFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine query()
 */
	class Vaccine extends \Eloquent {}
}

