<?php

namespace App\Models;

use App\Casts\Password;
use App\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, Searchable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => Password::class,
    ];

    const ADMIN = 'admin';
    const USER = 'user';

    const REGEX = [
        'phone' => '/^\+639\d{9}$/',
        'email' => '/^[a-zA-Z0-9Ññ\-\_\.+-]+@([a-zA-Z]+\.)+[a-zA-Z]{2,4}$/',
    ];

    const ROLES = [
        self::ADMIN,
        self::USER
    ];

    protected static function booted()
    {
        static::deleting(function (self $user) {
            $user->appointments->each->delete();
            $user->assigns->each->delete();
        });
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }

    /**
     * Format mobile prefix number to start with +63
     *
     * @param $mobileNumber
     * @return string
     */
    public static function formatPrefix($mobileNumber): string
    {
        if (strlen($mobileNumber) === 11) {
            $mobileNumber = '+63' . substr($mobileNumber, 1);
        }

        if (strlen($mobileNumber) === 12) {
            $mobileNumber = '+' . $mobileNumber;
        }

        return $mobileNumber;
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class)->latest();
    }

    public function assigns()
    {
        return $this->hasMany(Appointment::class, 'attendee_id')->latest('updated_at');
    }

    public function isAdmin()
    {
        return $this->role === static::ADMIN;
    }

    public function isUser()
    {
        return $this->role === static::USER;
    }

    /**
     * Determine if the model should be searchable.
     *
     * @return bool
     */
    public function shouldBeSearchable()
    {
        return $this->hasVerifiedEmail();
    }
}
