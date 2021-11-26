<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentVaccine extends Model
{
    use HasFactory;

    protected $fillable = ['vaccine_id', 'appointment_id'];

    protected static function booted()
    {
        static::deleting(function (self $appointmentVaccine) {
            $appointmentVaccine->appointmentDates->each->delete();
        });
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
