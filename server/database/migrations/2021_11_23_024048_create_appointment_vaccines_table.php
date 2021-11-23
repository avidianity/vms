<?php

use App\Models\Appointment;
use App\Models\Vaccine;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentVaccinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointment_vaccines', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Appointment::class)->constrained();
            $table->foreignIdFor(Vaccine::class)->constrained();
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
        Schema::dropIfExists('appointment_vaccines');
    }
}
