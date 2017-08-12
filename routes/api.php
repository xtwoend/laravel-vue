<?php

use Illuminate\Http\Request;

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

Route::post('login', 'AuthController@login');
Route::get('user', 'AuthController@user')->middleware('auth:api');

Route::middleware('auth:api')->get('/ping', function (Request $request) {
    return response()->json(['success'=> true], 200);
});
