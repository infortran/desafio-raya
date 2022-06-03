<?php

namespace App\Http\Controllers;

use App\Models\Records;
use Illuminate\Http\Request;
use App\Models\Region;

class RecordsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Records::with('comuna.provincia.region')->paginate();
    }

    public function getRecordsByReg(){
        if(request('region')){
            $registros
        }
    }

    public function getRecordsByRegion(){
        if(request('region')){
            //$region = Region::findOrFail(request('region'));
            $registros = Records::with('comuna.provincia.region')->paginate(25);
            return response()->json(['aers' => $registros]);
            $filtro = [];
            foreach($registros['data'] as $reg){
                if($reg->comuna->provincia->region->id == request('region')){
                    array_push($filtro, $reg);
                }
                
            }
            return response()->json(
                [
                    'current_page' => $registros['current_page'],
                    'data' => $filtro,
                    'first_page_url' => $registros['first_page_url'],
                    'from' => $registros['from'],
                    'last_page' => $registros['last_page'],
                    'links' => $registros['links'],
                    'next_page' => $registros['next_page'],
                    'path' => $registros['path'],
                    'per_page' => $registros['per_page'],
                    'prev_page_url' => $registros['prev_page_url'],
                    'to' => $registros['to'],
                    'total' => $registros['total']
                    ]);
            //tengo el id de la region
            //necesito los registros que sean de la misma region 
            //tengo que revisar las comunas de los registros
            //con el id de las comunas tengo que consultar las provincias
            //y con las provincias consultar que region es
            //finalmente esa region debe hacer match con el id que viene
        }
        return response()->json(['No encontrado'], 404);
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
     * @param  \App\Models\Records  $records
     * @return \Illuminate\Http\Response
     */
    public function show(Records $records)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Records  $records
     * @return \Illuminate\Http\Response
     */
    public function edit(Records $records)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Records  $records
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Records $records)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Records  $records
     * @return \Illuminate\Http\Response
     */
    public function destroy(Records $records)
    {
        //
    }
}
