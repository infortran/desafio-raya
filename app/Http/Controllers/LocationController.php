<?php

namespace App\Http\Controllers;

use App\Models\Comuna;
use App\Models\Provincia;
use App\Models\Region;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function regiones(){
        return Region::all();
    }
    public function provincias(){
        return Provincia::all();
    }

    public function comunas(){
        return Comuna::all();
    }

    public function comunasByRegion(){
        if(request('region')){
            return Comuna::with('provincia.region')->whereHas('provincia', function($query){
                $query->whereHas('region', function($q){
                    $q->where('region_id', request('region'));
                });
            })->get();
        }
        return response()->json(['No encontrado'], 404);
    }
}
