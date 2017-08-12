<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Guard $auth, Request $request)
    {
        // get some credentials
        $credentials = $request->only(['username', 'password']);
        
        if ($auth->attempt($credentials)) {
            
            $token = $auth->issue();

            return response()->json([
                'success' => true,
                'data'    => $auth->user(),
                'meta'    => [
                    'token' => $token
                ]
            ], 200);
        }
        
        return response()->json([
                'success' => true,
                'message'    => 'Invalid Credentials'
            ], 401);
    }

    public function user(Guard $auth)
    {
        $user = $auth->user();
        
        return response()->json([
            'success' => true,
            'data'  => $user,
            'meta' => [
                'token' => $auth->issue()
            ]
        ], 200);
    }

    public function logout()
    {
        # code...
    }
}
