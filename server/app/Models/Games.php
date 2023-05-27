<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class Games extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_name',
        'game_image',
        'topic',
        'action'
    ];

    public function getListGame()
    {
        $data = DB::table('games')
        ->select('games.*', 'topic.topic_name', 'action.action_name')
        ->join('topic', 'topic.id', '=', 'games.topic')
        ->join('action', 'action.id', '=', 'games.action')
        ->get();
        return response()->json($data);
    }

    public function getScoresByUser($user_id, $game_id)
    {
        $data = DB::table('user_game')
        ->join('users', 'users.id', '=', 'user_game.user_id')
        ->join('games', 'games.id', '=', 'user_game.game_id')
        ->where('users.id', $user_id)
        ->where('games.id', $game_id)
        ->get();
        return response()->json($data);
    }
    public function getScoresOfAllUsers($game_id)
    {
        $data = DB::table('user_game')
        ->join('users', 'users.id', '=', 'user_game.user_id')
        ->join('games', 'games.id', '=', 'user_game.game_id')
        ->where('games.id', $game_id)
        ->orderByDesc('score')
        ->take(10)
        ->get();
        return response()->json($data);
    }

    public function addScoreByUser(Request $request) {
        $userId = $request->input('user_id');
        $gameId = $request->input('game_id');
        $score = $request->input('score');
    
        DB::table('user_game')->insert(["user_id" => $userId, "game_id" => $gameId, "score" => $score]);
    }
}
