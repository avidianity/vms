<?php

namespace App\Exceptions;

use Exception;

class AppointedVaccineIsDoneException extends Exception
{
    public function __construct()
    {
        parent::__construct('Appointed vaccine is already done with doses.', 400);
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response(['message' => 'Appointed vaccine is already done with doses.'], 400);
    }
}
