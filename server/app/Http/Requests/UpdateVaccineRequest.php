<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVaccineRequest extends FormRequest
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
            'name' => ['nullable', 'string', 'max:255'],
            'at_birth' => ['nullable', 'boolean'],
            'one_month_and_a_half' => ['nullable', 'boolean'],
            'two_months_and_a_half' => ['nullable', 'boolean'],
            'three_months_and_a_half' => ['nullable', 'boolean'],
            'nine_months' => ['nullable', 'boolean'],
            'one_year' => ['nullable', 'boolean'],
            'doses' => ['nullable', 'numeric'],
            'quantity' => ['nullable', 'numeric'],
        ];
    }
}
