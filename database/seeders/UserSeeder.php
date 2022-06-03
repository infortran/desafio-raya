<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([[
            'name' => 'John Smith',
            'email' => 'john@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'region_id' => 7
        ],
        [
            'name' => 'Ada wong',
            'email' => 'ada@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'region_id' => 6
        ],
        [
            'name' => 'Harry Mason',
            'email' => 'harry@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'region_id' => 1
        ]
        ]);
    }
}
