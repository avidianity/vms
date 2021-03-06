<?php

namespace App\Http\Requests;

use App\Models\AppointmentVaccine;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppointmentVaccineDateRequest extends FormRequest
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
            'appointment_vaccine_id' => ['required', Rule::exists(AppointmentVaccine::class, 'id')],
            'date' => ['required', 'date'],
            'done' => ['nullable', 'boolean'],
        ];
    }
}
