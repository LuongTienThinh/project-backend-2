<?php

use App\Http\Controllers\IrregularsController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\VocabularyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActionController;
use App\Http\Controllers\TopicController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// IrregularsController

Route::get('/irregular', [IrregularsController::class, 'getIrregulars']);
Route::get('/irregular-paginate', [IrregularsController::class, 'getIrregularsPaginate']);


// GamesController

Route::get('/list-game', [GamesController::class, 'getListGame']);
Route::get('/game-{id}', [GamesController::class, 'show']);
Route::get('/history-{user_id}-{game_id}', [GamesController::class, 'getScoresByUser']);
Route::get('/ranks-{game_id}', [GamesController::class, 'getSccoresOfAllUsers']);


// UserController

Route::get('/user-{user_id}', [UserController::class, 'show']);

Route::get('/list-users', [UserController::class, 'index']);

Route::post('/create-user', function(Request $request) {
    $name = $request->input('user_name');
    $email = $request->input('email');
    $password = $request->input('password');

    $hashedPassword = Hash::make($password);
    User::create(["email" => $email, "user_name" => $name, "password" => $hashedPassword]);
});


// VocabularyController

Route::get('/word-english', [VocabularyController::class, 'wordEnglish']);

Route::post('/notes-word', function(Request $request) {
    $user = $request->input('user_id');
    $word = $request->input('word_id');
    
    DB::table('note_word')->insert(["user_id" => $user, "word_id" => $word, "irregular_id" => 0]);
});

Route::get('/notes-vocabulary-{user_id}', [VocabularyController::class, 'getVocabularyByUser']);
Route::get('/notes-irregular-{user_id}', [VocabularyController::class, 'getIrregularByUser']);

Route::post('/notes-irregular', function(Request $request) {
    $user = $request->input('user_id');
    $irregular = $request->input('irregular_id');
    
    DB::table('note_word')->insert(["user_id" => $user, "word_id" => 0, "irregular_id" => $irregular]);
});


// TopicController

Route::get('/topics', [TopicController::class, 'index']);


// ActionController
Route::get('/actions', [ActionController::class, 'index']);