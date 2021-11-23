<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentVaccineDate extends Model
{
    use HasFactory;

    protected $fillable = ['appointment_vaccine_id', 'date'];

    protected $dates = ['date'];

    public function appointmentVaccine()
    {
        return $this->belongsTo(AppointmentVaccine::class);
    }
}
