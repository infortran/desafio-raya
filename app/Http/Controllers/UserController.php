<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    private $customFieldsMessages = [
        'required' => 'El campo es obligatorio',
        'string' => 'Solo puedes ingresar caracteres',
        'max' => 'El maximo es 255 carateres',
        'email' => 'El formato de email es incorrecto',
        'integer' => 'El campos solo acepta numeros',
        'email.unique' => 'El email ya esta siendo usado por otro usuario',
    ];

    public function index(){
        return User::with('region')->orderBy('id', 'DESC')->paginate(25);
    }

    public function show(User $user){
        return User::with('region')->where('id', $user->id)->first();
    }

    public function store(Request $request){
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required',
            'region_id' => 'required'
        ], $this->customFieldsMessages);
        $data['password'] = Hash::make(request('password'));
        //$data['role'] = $data['role'] ? 'admin' : 'user';
        User::create($data);
        return response()->json(['status' => 'El usuario se ha creado correctamente.'],200);
    }

    public function update(Request $request, User $user){
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required',
            'region_id' => 'required'
        ], $this->customFieldsMessages);

        $data['password'] = Hash::make(request('password'));
        $user->update($data);
        return response()->json(['status' => 'El usuario se ha modificado correctamente.'],200);
    }

    public function destroy(User $user){
        $user->delete();
        return response()->json(['status' => 'El usuario se ha eliminado correctamente'],200);
    }
}
