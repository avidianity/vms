<?php

namespace App\Http\Controllers;

use App\Exceptions\AppointedVaccineIsDoneException;
use App\Http\Requests\StoreAppointmentVaccineDateRequest;
use App\Http\Requests\UpdateAppointmentVaccineDateRequest;
use App\Models\AppointmentVaccine;
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
     * @throws \App\Exceptions\AppointedVaccineIsDoneException
     */
    public function store(StoreAppointmentVaccineDateRequest $request)
    {
        $data = $request->validated();

        $appointmentVaccine = AppointmentVaccine::with(['vaccine'])->withCount(['appointmentDates'])->findOrFail($data['appointment_vaccine_id']);

        if ($appointmentVaccine->appointment_dates_count >= $appointmentVaccine->vaccine->doses) {
            throw new AppointedVaccineIsDoneException;
        }

        $appointmentVaccineDate = AppointmentVaccineDate::create($data);

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

        $appointmentVaccine = $appointmentVaccineDate->appointmentVaccine;

        if ($appointmentVaccineDate->done) {
            $user = $appointmentVaccineDate->appointmentVaccine->appointment->user;
            $appointmentVaccine->vaccine->update(['quantity' => $appointmentVaccine->vaccine->quantity - 1]);

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
