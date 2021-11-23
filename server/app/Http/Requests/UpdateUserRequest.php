<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'email' => ['nullable', 'string', 'email', Rule::unique(User::class), 'regex:' . User::REGEX['email']],
            'phone' => ['nullable', 'string', Rule::unique(User::class), 'regex:' . User::REGEX['phone']],
            'password' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', Rule::in(User::ROLES)],
        ];
    }
}
