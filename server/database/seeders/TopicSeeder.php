<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TopicSeeder extends Seeder
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
            ["topic_name" => "Irregular"],
            ["topic_name" => "Grammar"],
            ["topic_name" => "Word"]
        ];

        $data = DB::table('topic')->insert($data);
    }
}