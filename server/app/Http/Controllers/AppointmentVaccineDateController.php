<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentVaccineDateRequest;
use App\Http\Requests\UpdateAppointmentVaccineDateRequest;
use App\Models\AppointmentVaccineDate;

class AppointmentVaccineDateController extends Controller
{
    protected $withs = ['appointmentVaccine'];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AppointmentVaccineDate::with($this->with)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAppointmentVaccineDateRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAppointmentVaccineDateRequest $request)
    {
        return AppointmentVaccineDate::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AppointmentVaccineDate  $appointmentVaccineDate
     * @return \Illuminate\Http\Response
     */
    public function show(AppointmentVaccineDate $appointmentVaccineDate)
    {
        $appointmentVaccineDate->load($this->withs);

        return $appointmentVaccineDate;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAppointmentVaccineDateRequest  $request
     * @param  \App\Models\AppointmentVaccineDate  $appointmentVaccineDate
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAppointmentVaccineDateRequest $request, AppointmentVaccineDate $appointmentVaccineDate)
    {
        $appointmentVaccineDate->update($request->validated());
        $appointmentVaccineDate->load($this->with);

        return $appointmentVaccineDate;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AppointmentVaccineDate  $appointmentVaccineDate
     * @return \Illuminate\Http\Response
     */
    public function destroy(AppointmentVaccineDate $appointmentVaccineDate)
    {
        return response('', 204);
    }
}
