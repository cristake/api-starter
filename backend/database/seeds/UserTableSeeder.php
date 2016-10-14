<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = [
            'name' => 'Yismen Jorge',
            'email' => 'yismen.jorge@gmail.com',
            'password' => Hash::make('jimmagic32'),
        ];

        User::create($user1);
    }
}
