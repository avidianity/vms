<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentVaccineDate extends Model
{
    use HasFactory;

    protected $fillable = ['appointment_vaccine_id', 'date', 'done'];

    protected $dates = ['date'];

    protected $casts = ['done' => 'boolean'];

    public function appointmentVaccine()
    {
        return $this->belongsTo(AppointmentVaccine::class);
    }
}
