<?php

namespace App\Rules;
use Freshwork\ChileanBundle\Rut;

use Illuminate\Contracts\Validation\Rule;

class RutRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        return Rut::parse($value)->quiet()->validate();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El RUT ingresado es incorrecto.';
    }
}
