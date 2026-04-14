<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\Request;

class SupabaseController extends Controller
{
    protected $supabase;

    public function __construct(SupabaseService $supabase)
    {
        $this->supabase = $supabase;
    }

    public function test()
    {
        try {
            // Test basic connection
            $response = $this->supabase->get('/rest/v1/', [
                'select' => 'version()'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Supabase connection successful!',
                'data' => $response
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Supabase connection failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUsers()
    {
        try {
            $users = $this->supabase->select('users');
            
            return response()->json([
                'success' => true,
                'data' => $users
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching users: ' . $e->getMessage()
            ], 500);
        }
    }

    public function insertUser(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
            ]);

            $result = $this->supabase->insert('users', $data);
            
            return response()->json([
                'success' => true,
                'message' => 'User created successfully!',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating user: ' . $e->getMessage()
            ], 500);
        }
    }
}
