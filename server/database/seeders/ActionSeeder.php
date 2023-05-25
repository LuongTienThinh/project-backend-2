<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $data = [
            ["action_name" => "Choose correct word"],
            ["action_name" => "Fill the empty"],
            ["action_name" => "Matching"]
        ];

        $data = DB::table('action')->insert($data);
    }
}