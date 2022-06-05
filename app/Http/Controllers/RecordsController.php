<?php

namespace App\Http\Controllers;

use App\Models\Comuna;
use App\Models\Records;
use Illuminate\Http\Request;
use App\Models\Region;
use App\Rules\RutRule;

class RecordsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Records::with('comuna.provincia.region')->orderBy('id', 'DESC')->paginate();
    }

    //conseguir con el id de la region e id de la comuna
    public function recordsByRegion(){
        if(request('region')){
            return Records::with('comuna.provincia.region')->whereHas('comuna', function($query){
                $query->whereHas('provincia', function($que){
                    $que->whereHas('region', function($q) {
                        $q->where('region_id', request('region'));
                    });
                });
            })->paginate();
        }
        return response()->json(['No encontrado'], 404);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'rut' => ['required', 'string', new RutRule],
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'date_birth' => 'required|date',
            'comuna_id' => 'required'
        ]);
        Records::create($data);
        return response()->json(['status' => 'Registro creado correctamente'], 200);
    }

    public function show(Records $record)
    {
        return Records::with('comuna.provincia.region')->where('id', $record->id)->first();
    }

    public function update(Request $request, Records $record)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'rut' => ['required', 'string', new RutRule],
            'email' => 'required|email',
            'phone' => 'required|integer',
            'date_birth' => 'required|date',
            'comuna_id' => 'required'
        ]);

        $record->update($data);
        return response()->json(['status' => 'Registro editado correctamente'], 200);
    }

    public function destroy(Records $records)
    {
        //
    }
}
