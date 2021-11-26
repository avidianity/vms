<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->isAdmin();
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
            'password' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', Rule::in(User::ROLES)],
        ];
    }
}
