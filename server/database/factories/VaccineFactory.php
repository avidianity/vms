<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VaccineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->streetName,
            'at_birth' => $this->faker->boolean,
            'one_month_and_a_half' => $this->faker->boolean,
            'two_months_and_a_half' => $this->faker->boolean,
            'three_months_and_a_half' => $this->faker->boolean,
            'nine_months' => $this->faker->boolean,
            'one_year' => $this->faker->boolean,
            'doses' => $this->faker->numberBetween(1, 5),
            'quantity' => $this->faker->numberBetween(0, 50),
        ];
    }
}
