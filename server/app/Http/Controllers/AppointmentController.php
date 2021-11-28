<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    protected $withs = ['vaccines.vaccine', 'user', 'attendee'];

    public function search(SearchRequest $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = $request->user();

        $builder = Appointment::search($request->input('keyword'));

        $appointments = $builder
            ->get();

        $appointments->load($this->withs);

        if ($user->role === User::USER) {
            return $appointments->filter(function (Appointment $appointment) use ($user) {
                return $appointment->user_id === $user->id;
            });
        }

        return $appointments;
    }

    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = $request->user();

        $builder = Appointment::with($this->withs)->latest();

        if ($user->role === User::USER) {
            $builder = $builder->where('user_id', $user->id);
        }

        return $builder->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAppointmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAppointmentRequest $request)
    {
        $data = $request->validated();

        $user = $request->user();

        if ($user->isUser()) {
            $data['user_id'] = $user->id;
        }

        return Appointment::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param \Illuminate\Http\Request  $request
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Appointment $appointment)
    {
        /**
         * @var \App\Models\User
         */
        $user = $request->user();

        if ($user->role === User::USER && $user->id !== $appointment->user_id) {
            throw (new ModelNotFoundException)->setModel(
                Appointment::class,
                $appointment->id
            );
        }

        $appointment->load($this->withs);
        return $appointment;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAppointmentRequest  $request
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        $appointment->update($request->validated());
        $appointment->load($this->withs);

        return $appointment;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response('', 204);
    }
}
