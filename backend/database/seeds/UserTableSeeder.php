<?php

use App\User;
use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\Hash;

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
            'name' => 'Cristian Iosif',
            'email' => 'cristianiosif@me.com',
            // 'password' => Hash::make('parola'),
            'password' => bcrypt('parola')
        ];

        $user2 = [
            'name' => 'Mihnea Iosif',
            'email' => 'mihneaiosif@icloud.com',
            // 'password' => Hash::make('parola'),
            'password' => bcrypt('parola')
        ];

        User::create($user1);
        User::create($user2);
    }
}
