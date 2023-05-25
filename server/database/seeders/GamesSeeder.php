<?php

namespace Database\Seeders;

use Foostart\Category\Helpers\FoostartSeeder;
use Illuminate\Support\Facades\DB;

class GamesSeeder extends FoostartSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Truncate table games
        DB::table('games')->truncate();

        DB::table('user_game')->insert([
            ["user_id" => 1, "game_id" => 1, "score" => 14322],
            ["user_id" => 1, "game_id" => 1, "score" => 423423],
            ["user_id" => 1, "game_id" => 1, "score" => 23423]
        ]);

        //
        $data = [
            ["game_name" => "Irregular verb", "game_image" => "./irregular.jpg"],
            ["game_name" => "Part of speech", "game_image" => "./part-of-speech.jpg"],
            ["game_name" => "Sentence", "game_image" => "./sentence.jpg"],
        ];
        DB::table('games')->insert($data);
    }
}