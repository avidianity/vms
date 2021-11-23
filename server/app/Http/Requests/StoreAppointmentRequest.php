<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Rules\Gender;
use App\Rules\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppointmentRequest extends FormRequest
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
            'child' => ['required', 'string', 'max:255'],
            'father' => ['required', 'string', 'max:255'],
            'mother' => ['required', 'string', 'max:255'],
            'birthday' => ['required', 'date'],
            'place_of_birth' => ['required', 'string', 'max:255'],
            'sex' => ['required', Gender::class],
            'height' => ['required', 'string', 'max:255'],
            'weight' => ['required', 'string', 'max:255'],
            'user_id' => ['required', 'numeric', Rule::exists(User::class, 'id'), new Role(User::ADMIN)],
            'attendee_id' => ['nullable', 'numeric', Rule::exists(User::class, 'id'), new Role(User::USER)],
        ];
    }
}
