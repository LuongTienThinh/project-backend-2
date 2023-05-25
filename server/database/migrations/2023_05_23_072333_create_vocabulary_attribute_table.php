<?php

use Foostart\Category\Helpers\FoostartMigration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVocabularyAttributeTable extends FoostartMigration
{

    public function __construct()
    {
        $this->table = 'vocabulary_attribute';
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
            $table->integer('word_id')->unsigned();
            $table->integer('attribute_id')->unsigned();
            $table->integer('attribute_value')->comment('Attribute value');

            // Set common columns
            $this->setCommonColumns($table);

            // Setup other attributes
            $table->primary(array('word_id', 'attribute_id'));
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
