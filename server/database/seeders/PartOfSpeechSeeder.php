<?php

namespace Database\Seeders;

use Foostart\Category\Helpers\FoostartSeeder;
use Illuminate\Support\Facades\DB;
use App\Models\PartOfSpeech;

class PartOfSpeechSeeder extends FoostartSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Truncate table
        DB::table($this->table)->truncate();

        $data = [
            ["pos_name" => "Noun", "pos_acronym" => "N", "pos_define" => "A noun is a part of speech that is used to identify a person, place, thing, or idea."],
            ["pos_name" => "Pronoun", "pos_acronym" => "PRON", "pos_define" => "A pronoun is a word that is used in place of a noun to avoid repetition. It can refer to a person, object, or thing."],
            ["pos_name" => "Verb", "pos_acronym" => "V", "pos_define" => "A verb is a word that expresses an action, occurrence, or state of being. It conveys what the subject of the sentence is doing or experiencing."],
            ["pos_name" => "Adjective", "pos_acronym" => "ADJ", "pos_define" => "An adjective is a word that describes or modifies a noun or pronoun. It provides additional information about the noun or pronoun."],
            ["pos_name" => "Adverb", "pos_acronym" => "ADV", "pos_define" => "An adverb is a word that modifies a verb, adjective, or another adverb. It provides information about how, when, where, or to what extent an action is performed."],
            ["pos_name" => "Preposition", "pos_acronym" => "PREP", "pos_define" => "A preposition is a word that shows the relationship between a noun (or pronoun) and another word in the sentence. It indicates location, time, direction, or manner."],
            ["pos_name" => "Conjunction", "pos_acronym" => "CONJ", "pos_define" => "A conjunction is a word that connects words, phrases, or clauses in a sentence. It joins different parts of a sentence together."],
            ["pos_name" => "Interjection", "pos_acronym" => "INTJ", "pos_define" => "An interjection is a word or phrase that expresses strong emotion or surprise. It is often used independently to convey a sudden reaction or exclamation."]
        ];
        $data = DB::table('part_of_speech')->insert($data);
    }
}