<?php

namespace App\Repositories;

use App\User;
use Bosnadev\Repositories\Eloquent\Repository;

class UserRepository extends Repository
{
    /**
     * Specify Model class name
     *
     * @return mixed
     */
    function model()
    {
        return User::class;
    }
}