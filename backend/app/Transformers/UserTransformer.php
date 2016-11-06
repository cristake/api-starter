<?php

namespace App\Transformers;

use App\User;
use League\Fractal;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        // 
    ];

    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id'                => (int) $user->id,
            'name'              => $user->name,
            'email'             => $user->email,
            'created_at'        => $user->created_at->format('Y-m-d H:i:s'),
            'updated_at'        => $user->updated_at->format('Y-m-d H:i:s'),
            'links'   => [
                'rel' => 'self',
                'uri' => '/users/' . $user->id
            ]
        ];
    }

}