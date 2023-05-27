<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Vocabulary;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class VocabularyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getIrregularByUser($user_id)
    {
        $voca = new Vocabulary();
        return $voca->getIrregularByUser($user_id);
    }

    public function getVocabularyByUser($user_id)
    {
      $voca = new Vocabulary();
        return $voca->getVocabularyByUser($user_id);
    }

    public function wordEnglish()
    {
        $voca = new Vocabulary();
        return $voca->wordEnglish();
    }

    public function addNoteByUser(Request $request)
    {
        $voca = new Vocabulary();
        $voca->addNoteByUser($request);
    }
    
    public function addIrregularByUser(Request $request)
    {
        $voca = new Vocabulary();
        $voca->addIrregularByUser($request);
    }
}