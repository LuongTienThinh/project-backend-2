<?php

use Foostart\Category\Helpers\FoostartMigration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartOfSpeechTable extends FoostartMigration
{

    public function __construct()
    {
        $this->table = 'part_of_seech';
    }

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists($this->table);
        Schema::create($this->table, function (Blueprint $table) {
            $table->increments('id')->comment('Part of speech id');
            $table->string('pos_name', 100)->comment('Part of speech');
            $table->string('pos_acronym', 100)->comment('Part of speech acronym');
            $table->string('pos_define', 100)->comment('Part of speech define');

            // Set common columns
            $this->setCommonColumns($table);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists($this->table);
    }
}
