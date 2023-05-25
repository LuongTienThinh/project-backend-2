<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Irregulars extends Model
{
    use HasFactory;

    protected $fillable = [
        'base',
        'past',
        'participle',
        'description'
    ];
}
