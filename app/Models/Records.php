<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Records extends Model
{
    use HasFactory;

    public function comuna(){
        return $this->belongsTo('App\Models\Comuna');
    }

    
}
