<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetContentLanguage
{
    /**
     * Set the Content-Language header based on the current app locale.
     */
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request);

        $locale = str_replace('_', '-', app()->getLocale());
        $response->headers->set('Content-Language', $locale);

        return $response;
    }
}

