<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Irregulars extends Model
{
    use HasFactory;

    protected $fillable = [
        'base',
        'past',
        'participle',
        'description'
    ];
    public function getIrregulars()
    {
        $data = Irregulars::all();
        return response()->json($data);
    }

    public function getIrregularsPaginate() {
        $data = Irregulars::paginate(20);
        return response()->json($data);
    }
}
