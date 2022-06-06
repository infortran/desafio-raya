<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\RecordsController;
use App\Http\Controllers\UserController;
use App\Models\Region;
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


Route::get('/records/region/{region}', [RecordsController::class, 'recordsByRegion'])->middleware('auth:sanctum');

Route::resource('/records', RecordsController::class)->middleware('auth:sanctum');
Route::resource('/users', UserController::class)->middleware('auth:sanctum');
Route::get('/regiones', [LocationController::class, 'regiones']);
Route::get('/provincias', [LocationController::class, 'provincias']);
Route::get('/comunas', [LocationController::class, 'comunas']);

Route::get('/comunas-region/{region}', [LocationController::class, 'comunasByRegion']);