<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
