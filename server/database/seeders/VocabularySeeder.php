<?php

namespace Database\Seeders;

use Foostart\Category\Helpers\FoostartSeeder;
use Illuminate\Support\Facades\DB;
use App\Models\Vocabulary;
use Illuminate\Support\Facades\File;

class VocabularySeeder extends FoostartSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Truncate table
        DB::table('vocabulary')->truncate();

        $jsonPath = base_path('/data/php_data1.json');

        $jsonContent = File::get($jsonPath);
        $listObj = json_decode($jsonContent, true);

        $data = [];

        for ($i = 0; $i < 2000; $i++) {
            array_push($data, $listObj[$i]);
        }

        DB::table('vocabulary')->insert($data);
    }
}