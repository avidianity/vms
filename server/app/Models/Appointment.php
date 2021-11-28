<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Appointment extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'child',
        'father',
        'mother',
        'birthday',
        'place_of_birth',
        'sex',
        'height',
        'weight',
        'user_id',
        'attendee_id',
    ];

    protected $dates = [
        'birthday'
    ];

    protected $appends = ['done'];

    public function toSearchableArray()
    {
        $this->load(['user', 'attendee']);
        return $this->toArray();
    }

    protected static function booted()
    {
        static::deleting(function (self $appointment) {
            $appointment->vaccines->each->delete();
        });
    }

    public function getDoneAttribute()
    {
        return $this->vaccines->first(function (AppointmentVaccine $appointmentVaccine) {
            return !$appointmentVaccine->done;
        }) === null && $this->vaccines->count() > 0;
    }

    public function vaccines()
    {
        return $this->hasMany(AppointmentVaccine::class)->latest();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attendee()
    {
        return $this->belongsTo(User::class, 'attendee_id');
    }
}
