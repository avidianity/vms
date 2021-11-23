<?php

use App\Models\AppointmentVaccine;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentVaccineDatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointment_vaccine_dates', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(AppointmentVaccine::class)->constrained();
            $table->date('date');
            $table->boolean('done')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointment_vaccine_dates');
    }
}
