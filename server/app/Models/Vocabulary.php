<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class Vocabulary extends Model
{
    use HasFactory;

    protected $fillable = [
        'word',
        'meaning',
        'similar_word',
        'opposite_word',
        'pos_id',
        'forms',
    ];

    public function getVocabularyByUser($user_id)
    {
        $data = DB::table('note_word')
            ->select('note_word.*', 'vocabulary.*')
            ->join('users', 'note_word.user_id', '=', 'users.id')
            ->join('vocabulary', 'note_word.word_id', '=', 'vocabulary.id')
            ->where('users.id', $user_id)
            ->get();
        return response()->json($data);
    }
    
    public function getIrregularByUser($user_id)
    {
        $data = DB::table('note_word')
            ->select('note_word.*', 'irregulars.*')
            ->join('users', 'note_word.user_id', '=', 'users.id')
            ->join('irregulars', 'note_word.irregular_id', '=', 'irregulars.id')
            ->where('users.id', $user_id)
            ->get();
        return response()->json($data);
    }
    public function wordEnglish()
    {
        $data = DB::table('word_english')->get()->toArray();
        $data = array_map(function ($element) {
            return $element->word;
        }, $data);
        $data = array_filter($data, function ($element) {
            return !strpos($element, "'s");
        });
        $result = [];
        foreach ($data as $key => $value) {
            array_push($result, $value);
        }
        return response()->json(array_slice($result, 0, 100));
    }

    public function addNoteByUser(Request $request) {
        $user = $request->input('user_id');
        $word = $request->input('word_id');
        
        DB::table('note_word')->insert(["user_id" => $user, "word_id" => $word, "irregular_id" => 0]);
    }

    public function addIrregularByUser(Request $request) {
        $user = $request->input('user_id');
        $irregular = $request->input('irregular_id');
        
        DB::table('note_word')->insert(["user_id" => $user, "word_id" => 0, "irregular_id" => $irregular]);
    }
}
