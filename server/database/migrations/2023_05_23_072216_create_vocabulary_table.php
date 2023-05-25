<?php

use Foostart\Category\Helpers\FoostartMigration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVocabularyTable extends FoostartMigration
{

    public function __construct()
    {
        $this->table = 'vocabulary';
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
            $table->id()->comment("Primary key");
            $table->string('word', 100);
            $table->text('meaning')->comment('Meaning of word');
            $table->text('similar_word');
            $table->text('opposite_word');
            $table->text('part_of_speech');
            $table->text('forms');

            // Relation
            // $table->integer('pos_id')->unsigned()->comment('Part of speech');

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
