<?php

namespace App\Rules;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Contracts\Validation\Rule;

class UniqueChild implements Rule
{
    protected $user;

    /**
     * Create a new rule instance.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return Appointment::whereChild($value)
            ->whereUserId($this->user->id)
            ->first() === null;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Child already has an existing appointment.';
    }
}
