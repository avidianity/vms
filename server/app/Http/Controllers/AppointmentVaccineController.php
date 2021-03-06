<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentVaccineRequest;
use App\Http\Requests\UpdateAppointmentVaccineRequest;
use App\Models\AppointmentVaccine;
use App\Notifications\AppointmentVaccineCreated;

class AppointmentVaccineController extends Controller
{
    protected $withs = ['vaccine', 'appointment', 'appointmentDates'];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AppointmentVaccine::with($this->withs)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAppointmentVaccineRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAppointmentVaccineRequest $request)
    {
        $data = $request->validated();

        $exists = AppointmentVaccine::whereAppointmentId($data['appointment_id'])
            ->whereVaccineId($data['vaccine_id'])
            ->first();

        if ($exists) {
            return response(['message' => 'Vaccine is already assigned to this appointment.'],  400);
        }

        $appointmentVaccine = AppointmentVaccine::create($data);

        $user = $appointmentVaccine->appointment->user;

        $user->notify(new AppointmentVaccineCreated($appointmentVaccine));

        return $appointmentVaccine;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AppointmentVaccine  $appointmentVaccine
     * @return \Illuminate\Http\Response
     */
    public function show(AppointmentVaccine $appointmentVaccine)
    {
        $appointmentVaccine->load($this->withs);
        return $appointmentVaccine;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAppointmentVaccineRequest  $request
     * @param  \App\Models\AppointmentVaccine  $appointmentVaccine
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAppointmentVaccineRequest $request, AppointmentVaccine $appointmentVaccine)
    {
        $appointmentVaccine->update($request->validated());
        $appointmentVaccine->load($this->withs);

        return $appointmentVaccine;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AppointmentVaccine  $appointmentVaccine
     * @return \Illuminate\Http\Response
     */
    public function destroy(AppointmentVaccine $appointmentVaccine)
    {
        $appointmentVaccine->delete();

        return response('', 204);
    }
}
