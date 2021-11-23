<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Rules\Gender;
use App\Rules\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'child' => ['nullable', 'string', 'max:255'],
            'father' => ['nullable', 'string', 'max:255'],
            'mother' => ['nullable', 'string', 'max:255'],
            'birthday' => ['nullable', 'date'],
            'place_of_birth' => ['nullable', 'string', 'max:255'],
            'sex' => ['nullable', Gender::class],
            'height' => ['nullable', 'string', 'max:255'],
            'weight' => ['nullable', 'string', 'max:255'],
            'user_id' => ['nullable', 'numeric', Rule::exists(User::class, 'id'), new Role(User::ADMIN)],
            'attendee_id' => ['nullable', 'numeric', Rule::exists(User::class, 'id'), new Role(User::USER)],
        ];
    }
}
