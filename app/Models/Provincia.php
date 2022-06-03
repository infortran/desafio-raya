<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    use HasFactory;

    public function comunas(){
        return $this->hasMany('App\Models\Comuna');
    }

    public function region(){
        return $this->belongsTo('App\Models\Region');
    }
}
