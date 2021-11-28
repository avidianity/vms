<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AuthRegisterRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', Rule::unique(User::class), 'regex:' . User::REGEX['email']],
            'phone' => ['required', 'string', Rule::unique(User::class), 'regex:' . User::REGEX['phone']],
            'password' => ['required', 'string', 'max:255', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'Email is already taken.',
            'phone.unique' => 'Phone is already taken.',
        ];
    }
}
