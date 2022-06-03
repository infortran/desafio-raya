<?php

use App\Http\Controllers\RecordsController;
use App\Http\Controllers\UserController;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/records/region/{region}', [RecordsController::class, 'getRecordsByRegion'])->middleware('auth:sanctum');

Route::resource('/records', RecordsController::class)->middleware('auth:sanctum');
Route::resource('/users', UserController::class)->middleware('auth:sanctum');