<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentVaccineDateRequest;
use App\Http\Requests\UpdateAppointmentVaccineDateRequest;
use App\Models\AppointmentVaccineDate;
use App\Notifications\AppointmentVaccineDateCreated;
use App\Notifications\AppointmentVaccineDateDone;

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
        return AppointmentVaccineDate::with($this->withs)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAppointmentVaccineDateRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAppointmentVaccineDateRequest $request)
    {
        $appointmentVaccineDate = AppointmentVaccineDate::create($request->validated());

        $user = $appointmentVaccineDate->appointmentVaccine->appointment->user;

        $user->notify(new AppointmentVaccineDateCreated($appointmentVaccineDate));

        return $appointmentVaccineDate;
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
        $appointmentVaccineDate->load($this->withs);

        if ($appointmentVaccineDate->done) {
            $user = $appointmentVaccineDate->appointmentVaccine->appointment->user;

            $user->notify(new AppointmentVaccineDateDone($appointmentVaccineDate));
        }

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
        $appointmentVaccineDate->delete();

        return response('', 204);
    }
}
