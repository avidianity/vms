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
 * @property int $id
 * @property string $title
 * @property mixed $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\AnnouncementFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement query()
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereUpdatedAt($value)
 */
	class Announcement extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Appointment
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $attendee_id
 * @property string $child
 * @property string $father
 * @property string $mother
 * @property \Illuminate\Support\Carbon $birthday
 * @property string $place_of_birth
 * @property string $sex
 * @property string|null $height
 * @property string|null $weight
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $attendee
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AppointmentVaccine[] $vaccines
 * @property-read int|null $vaccines_count
 * @method static \Database\Factories\AppointmentFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereAttendeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereBirthday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereChild($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereFather($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereMother($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment wherePlaceOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereSex($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereWeight($value)
 */
	class Appointment extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AppointmentVaccine
 *
 * @property int $id
 * @property int $appointment_id
 * @property int $vaccine_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Appointment $appointment
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AppointmentVaccineDate[] $appointmentDates
 * @property-read int|null $appointment_dates_count
 * @property-read bool $done
 * @property-read \App\Models\Vaccine $vaccine
 * @method static \Database\Factories\AppointmentVaccineFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine query()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine whereAppointmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccine whereVaccineId($value)
 */
	class AppointmentVaccine extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AppointmentVaccineDate
 *
 * @property int $id
 * @property int $appointment_vaccine_id
 * @property \Illuminate\Support\Carbon $date
 * @property bool $done
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\AppointmentVaccine $appointmentVaccine
 * @method static \Database\Factories\AppointmentVaccineDateFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate query()
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate whereAppointmentVaccineId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate whereDone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppointmentVaccineDate whereUpdatedAt($value)
 */
	class AppointmentVaccineDate extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property mixed $password
 * @property string $role
 * @property string|null $email_verified_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
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
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\MustVerifyEmail {}
}

namespace App\Models{
/**
 * App\Models\Vaccine
 *
 * @property int $id
 * @property string $name
 * @property bool $at_birth
 * @property bool $one_month_and_a_half
 * @property bool $two_months_and_a_half
 * @property bool $three_months_and_a_half
 * @property bool $nine_months
 * @property bool $one_year
 * @property int $doses
 * @property int $quantity
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AppointmentVaccine[] $appointments
 * @property-read int|null $appointments_count
 * @method static \Database\Factories\VaccineFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine query()
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereAtBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereDoses($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereNineMonths($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereOneMonthAndAHalf($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereOneYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereThreeMonthsAndAHalf($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereTwoMonthsAndAHalf($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vaccine whereUpdatedAt($value)
 */
	class Vaccine extends \Eloquent {}
}

