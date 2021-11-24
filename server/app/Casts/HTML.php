<?php

namespace App\Casts;

use App\Services\HTMLService;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class HTML implements CastsAttributes
{
    protected $service;

    public function __construct()
    {
        $this->service = app(HTMLService::class);
    }

    /**
     * Cast the given value.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return mixed
     */
    public function get($model, string $key, $value, array $attributes)
    {
        return $value;
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return mixed
     */
    public function set($model, string $key, $value, array $attributes)
    {
        return $this->service->clean($value);
    }
}
