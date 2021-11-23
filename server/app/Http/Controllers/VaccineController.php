<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVaccineRequest;
use App\Http\Requests\UpdateVaccineRequest;
use App\Models\Vaccine;

class VaccineController extends Controller
{
    protected $withs = ['appointments'];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Vaccine::with($this->withs)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreVaccineRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVaccineRequest $request)
    {
        return Vaccine::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vaccine  $vaccine
     * @return \Illuminate\Http\Response
     */
    public function show(Vaccine $vaccine)
    {
        $vaccine->load($this->withs);
        return $vaccine;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateVaccineRequest  $request
     * @param  \App\Models\Vaccine  $vaccine
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVaccineRequest $request, Vaccine $vaccine)
    {
        $vaccine->update($request->validated());
        $vaccine->load($this->withs);

        return $vaccine;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vaccine  $vaccine
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vaccine $vaccine)
    {
        $vaccine->delete();

        return response('', 204);
    }
}
