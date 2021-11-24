<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $gender = $this->faker->randomElement(['Male', 'Female']);
        return [
            'child' => $this->faker->name($gender),
            'father' => $this->faker->name('Male'),
            'mother' => $this->faker->name('Female'),
            'birthday' => $this->faker->date(),
            'place_of_birth' => $this->faker->address,
            'sex' => $gender,
            'height' => $this->faker->numberBetween(1, 2) . 'ft',
            'weight' => $this->faker->numberBetween(1, 5) . 'kg',
        ];
    }
}
