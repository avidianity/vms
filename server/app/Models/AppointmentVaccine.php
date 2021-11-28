<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentVaccine extends Model
{
    use HasFactory;

    protected $fillable = ['vaccine_id', 'appointment_id'];

    protected $appends = ['done'];

    protected static function booted()
    {
        static::deleting(function (self $appointmentVaccine) {
            $appointmentVaccine->appointmentDates->each->delete();
        });
    }

    /**
     * @return bool
     */
    public function getDoneAttribute()
    {
        return $this->appointmentDates->filter(function (AppointmentVaccineDate $appointmentVaccineDate) {
            return $appointmentVaccineDate->done;
        })->count() >= $this->vaccine()->first()?->doses ?? 0;
    }

    public function vaccine()
    {
        return $this->belongsTo(Vaccine::class);
    }

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function appointmentDates()
    {
        return $this->hasMany(AppointmentVaccineDate::class)->latest();
    }
}
