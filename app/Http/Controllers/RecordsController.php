<?php

namespace App\Http\Controllers;

use App\Models\Comuna;
use App\Models\Records;
use Illuminate\Http\Request;
use App\Models\Region;
use App\Rules\RutRule;

class RecordsController extends Controller
{
    private $customFieldsMessages = [
        'required' => 'El campo es obligatorio',
        'string' => 'Solo puedes ingresar caracteres',
        'max' => 'El maximo es 255 carateres',
        'email' => 'El formato de email es incorrecto',
        'integer' => 'El campos solo acepta numeros',
        'phone.max' => 'El numero de telefono es muy largo',
        'phone.min' => 'El numero de telefono es muy corto',
        'date' => 'El formato de fecha es incorrecto',
        'email.unique' => 'El email ya esta siendo usado por otro usuario',
        'rut.unique' => 'El rut ya esta siendo usado por otro usuario'
    ];
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Records::with('comuna.provincia.region')->orderBy('id', 'DESC')->paginate(25);
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
            })->paginate(25);
        }
        return response()->json(['No encontrado'], 404);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'rut' => ['required', 'string', 'unique:records', new RutRule],
            'email' => 'required|email|unique:records',
            'phone' => 'required|integer|min:100000000|max:999999999999',
            'date_birth' => 'required|date',
            'comuna_id' => 'required'
        ],$this->customFieldsMessages);
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
            'phone' => 'required|integer|min:100000000|max:9999999999',
            'date_birth' => 'required|date',
            'comuna_id' => 'required'
        ],$this->customFieldsMessages);

        $record->update($data);
        return response()->json(['status' => 'Registro editado correctamente'], 200);
    }

    public function destroy(Records $record)
    {
        $record->delete();
        return response()->json(['status' => 'El registro se ha eliminado correctamente'], 200);
    }
}
