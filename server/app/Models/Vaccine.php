<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Vaccine extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'name',
        'at_birth',
        'one_month_and_a_half',
        'two_months_and_a_half',
        'three_months_and_a_half',
        'nine_months',
        'one_year',
        'doses',
        'quantity',
    ];

    protected $casts = [
        'at_birth' => 'boolean',
        'one_month_and_a_half' => 'boolean',
        'two_months_and_a_half' => 'boolean',
        'three_months_and_a_half' => 'boolean',
        'nine_months' => 'boolean',
        'one_year' => 'boolean',
    ];

    protected static function booted()
    {
        static::deleting(function (self $vaccine) {
            $vaccine->appointments->each->delete();
        });
    }

    public function appointments()
    {
        return $this->hasMany(AppointmentVaccine::class);
    }
}
