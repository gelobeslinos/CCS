<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class SupabaseService
{
    protected $client;
    protected $url;
    protected $apiKey;

    public function __construct()
    {
        $this->url = env('SUPABASE_URL');
        $this->apiKey = env('SUPABASE_ANON_KEY');
        
        $this->client = new Client([
            'base_uri' => $this->url,
            'headers' => [
                'apikey' => $this->apiKey,
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    public function get($endpoint, $params = [])
    {
        try {
            $response = $this->client->get($endpoint, [
                'query' => $params
            ]);
            
            return json_decode($response->getBody()->getContents(), true);
        } catch (Exception $e) {
            throw new \Exception('Supabase API Error: ' . $e->getMessage());
        }
    }

    public function post($endpoint, $data = [])
    {
        try {
            $response = $this->client->post($endpoint, [
                'json' => $data
            ]);
            
            return json_decode($response->getBody()->getContents(), true);
        } catch (Exception $e) {
            throw new \Exception('Supabase API Error: ' . $e->getMessage());
        }
    }

    public function put($endpoint, $data = [], $params = [])
    {
        try {
            $response = $this->client->put($endpoint, [
                'json' => $data,
                'query' => $params
            ]);
            
            return json_decode($response->getBody()->getContents(), true);
        } catch (Exception $e) {
            throw new \Exception('Supabase API Error: ' . $e->getMessage());
        }
    }

    public function delete($endpoint, $params = [])
    {
        try {
            $response = $this->client->delete($endpoint, [
                'query' => $params
            ]);
            
            return json_decode($response->getBody()->getContents(), true);
        } catch (Exception $e) {
            throw new \Exception('Supabase API Error: ' . $e->getMessage());
        }
    }

    // Simple database operations
    public function select($table, $columns = '*', $where = [])
    {
        $endpoint = "/rest/v1/{$table}";
        
        $params = [];
        if ($columns !== '*') {
            $params['select'] = $columns;
        }
        
        if (!empty($where)) {
            foreach ($where as $column => $value) {
                $params[$column] = "eq.{$value}";
            }
        }

        return $this->get($endpoint, $params);
    }

    public function insert($table, $data)
    {
        $endpoint = "/rest/v1/{$table}";
        return $this->post($endpoint, $data);
    }

    public function update($table, $data, $where)
    {
        $endpoint = "/rest/v1/{$table}";
        
        $params = [];
        foreach ($where as $column => $value) {
            $params[$column] = "eq.{$value}";
        }

        return $this->put($endpoint, $data, $params);
    }

    public function deleteRecord($table, $where)
    {
        $endpoint = "/rest/v1/{$table}";
        
        $params = [];
        foreach ($where as $column => $value) {
            $params[$column] = "eq.{$value}";
        }

        return $this->delete($endpoint, $params);
    }
}
