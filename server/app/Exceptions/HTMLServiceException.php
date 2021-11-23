<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class HTMLServiceException extends HttpException
{
    public function __construct($message = '')
    {
        parent::__construct(500, $message);
    }
}
