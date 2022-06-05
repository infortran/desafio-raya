<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index(){
        return User::with('region')->paginate();
    }

    public function show(){
        
    }

    public function store(Request $request){
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required',
            'region_id' => 'required'
        ]);
        $data['password'] = Hash::make(request('password'));
        //$data['role'] = $data['role'] ? 'admin' : 'user';
        User::create($data);
        return response()->json(['status' => 'El usuario se ha creado correctamente.'],200);
    }

    public function update(Request $request, User $user){
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required',
            'region_id' => 'required'
        ]);

        $data['password'] = Hash::make(request('password'));
        $user->update($data);
        return response()->json(['status' => 'El usuario se ha modificado correctamente.'],200);
    }
}
