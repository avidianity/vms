<?php

namespace App\Rules;

use App\Models\Vaccine;
use Illuminate\Contracts\Validation\Rule;

class VaccineNotOutOfStock implements Rule
{
    protected $vaccine;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->vaccine = new Vaccine;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $this->vaccine = Vaccine::findOrFail($value);
        return $this->vaccine->quantity > 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return sprintf('Vaccine %s is out of stock.', $this->vaccine->name);
    }
}
