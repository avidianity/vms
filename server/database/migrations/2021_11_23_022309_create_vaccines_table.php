<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVaccinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vaccines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('at_birth')->default(false);
            $table->boolean('one_month_and_a_half')->default(false);
            $table->boolean('two_months_and_a_half')->default(false);
            $table->boolean('three_months_and_a_half')->default(false);
            $table->boolean('nine_months')->default(false);
            $table->boolean('one_year')->default(false);
            $table->unsignedInteger('doses');
            $table->unsignedBigInteger('quantity');
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
        Schema::dropIfExists('vaccines');
    }
}
