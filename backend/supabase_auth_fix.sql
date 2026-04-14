-- ========================================
-- SUPABASE AUTH USERS TABLE FIX
-- ========================================
-- Project: bivvrelxnkatpaahikvl
-- Database: postgres
-- Run these scripts in Supabase SQL Editor

-- ========================================
-- DROP OLD USERS TABLE (if exists)
-- ========================================
DROP TABLE IF EXISTS users CASCADE;

-- ========================================
-- CREATE NEW USERS TABLE (compatible with Supabase Auth)
-- ========================================
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    name TEXT,
    avatar_url TEXT,
    provider TEXT,
    role_id BIGINT REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- ========================================
-- SAMPLE DATA (optional)
-- ========================================
-- This will be populated automatically when users authenticate

-- ========================================
-- VERIFICATION
-- ========================================
-- Test the structure:
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
