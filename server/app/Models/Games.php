<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_name',
        'game_image',
        'topic',
        'action'
    ];
}
