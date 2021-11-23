<?php

namespace App\Http\Requests;

use App\Models\Appointment;
use App\Models\Vaccine;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAppointmentVaccineRequest extends FormRequest
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
            'vaccine_id' => ['nullable', 'numeric', Rule::exists(Vaccine::class, 'id')],
            'appointment_id' => ['nullable', 'numeric', Rule::exists(Appointment::class, 'id')],
        ];
    }
}
