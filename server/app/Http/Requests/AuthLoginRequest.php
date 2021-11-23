<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AuthLoginRequest extends FormRequest
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
            'email' => ['required_without:phone', 'string', 'email', Rule::exists(User::class), 'regex:' . User::REGEX['email']],
            'phone' => ['required_without:email', 'string', Rule::exists(User::class), 'regex:' . User::REGEX['phone']],
            'password' => ['required', 'string', 'max:255'],
        ];
    }

    protected function passedValidation()
    {
        parent::passedValidation();

        if ($this->has('email')) {
            $username = $this->input('email');
            $key = 'email';
        } else {
            $username = $this->input('phone');
            $key = 'phone';
        }

        $this->merge(['key' => $key, 'username' => $username]);
    }
}
