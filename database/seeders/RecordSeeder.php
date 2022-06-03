<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('records')->insert([[
            'name' => 'juan perez',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'juan@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 3
        ],
        [
            'name' => 'Jose Gonzalez',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 10
        ],
        [
            'name' => 'carlos tapia',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => Str::random(3).'user@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 10
        ],
        [
            'name' => 'raul sanchez',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => Str::random(3).'user@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 50
        ],
        [
            'name' => 'joaquin godoy',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => Str::random(3).'user@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 50
        ],
        [
            'name' => 'juan valdebenito',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => Str::random(3).'user@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 54
        ],
        [
            'name' => 'alexander perez',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => Str::random(3).'user@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 54
        ],
        [
            'name' => 'mayerlin urbina',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => Str::random(3).'user@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 55
        ],
        [
            'name' => 'ignacia perez',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => Str::random(3).'user@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 87
        ],
        [
            'name' => 'gladys pacheco',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => Str::random(3).'user@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 105
        ],

        [
            'name' => 'Jose Gonzalez 2',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose2@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 11
        ],

        [
            'name' => 'Jose Gonzalez 3',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose3@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 13
        ],
        [
            'name' => 'Jose Gonzalez 4',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose4@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 14
        ],
        [
            'name' => 'Jose Gonzalez 5',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose5@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 15
        ],
        [
            'name' => 'Jose Gonzalez 6',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose6@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 16
        ],
        [
            'name' => 'Jose Gonzalez 7',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jos7@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 17
        ],
        [
            'name' => 'Jose Gonzalez 8',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose8@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 18
        ],
        [
            'name' => 'Jose Gonzalez 9',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose9@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 19
        ],
        [
            'name' => 'Jose Gonzalez 10',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose10@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 20
        ],
        [
            'name' => 'Jose Gonzalez 11',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose11@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 21
        ],
        [
            'name' => 'Jose Gonzalez 12',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose12@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 22
        ],
        [
            'name' => 'Jose Gonzalez 13',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose13@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 23
        ],
        [
            'name' => 'Jose Gonzalez 14',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose14@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 24
        ],
        [
            'name' => 'Jose Gonzalez 15',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose15@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 25
        ],
        [
            'name' => 'Jose Gonzalez 16',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose16@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 10
        ],
        [
            'name' => 'Jose Gonzalez 17',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose17@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 103
        ],
        [
            'name' => 'Jose Gonzalez 18',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose18@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 108
        ],
        [
            'name' => 'Jose Gonzalez 19',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose19@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 10
        ],
        [
            'name' => 'Jose Gonzalez 20',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose20@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 10
        ],
        [
            'name' => 'Jose Gonzalez 21',
            'rut' => rand(8000000, 20000000).'-'.rand(1,9),
            'email' => 'jose21@gmail.com',
            'phone' => rand(100000000, 999999999),
            'comuna_id' => 10
        ],
       
        ]);
    }
}
