# Supabase Database Setup Guide

## 🚀 Quick Setup Instructions

### 1. Go to Your Supabase Dashboard
- URL: https://supabase.com/dashboard/project/bivvrelxnkatpaahikvl
- Navigate to: **SQL Editor**

### 2. Run the Setup Script
1. Copy the entire content from `supabase_setup.sql`
2. Paste it into the Supabase SQL Editor
3. Click **"Run"** to execute all commands
4. Wait for the script to complete (should take 30-60 seconds)

### 3. Verify Tables Created
After running the script, you should see these tables:
- ✅ users
- ✅ roles  
- ✅ students
- ✅ employees
- ✅ departments
- ✅ attendances
- ✅ leave_requests
- ✅ student_profiles
- ✅ student_interests
- ✅ subjects
- ✅ announcements
- ✅ cache
- ✅ jobs

### 4. Test Your Laravel Backend
```bash
# Test Supabase connection
curl http://127.0.0.1:8000/api/supabase/test

# Should return:
{
  "success": true,
  "message": "Supabase connection successful!",
  "data": {...}
}
```

## 📊 Database Schema Overview

### Core Tables:
- **users**: User authentication and management
- **roles**: User role definitions (admin, teacher, student, employee)
- **students**: Student information and records
- **employees**: Employee data and details
- **departments**: Organizational structure

### Operational Tables:
- **attendances**: Time tracking and attendance records
- **leave_requests**: Employee leave management
- **student_profiles**: Extended student information with JSON fields
- **student_interests**: Student hobbies and interests
- **subjects**: Academic course catalog
- **announcements**: System announcements and notices

### System Tables:
- **cache**: Laravel session and cache storage
- **jobs**: Laravel queue job management

## 🔧 Advanced Configuration

### Row Level Security (RLS)
The setup includes basic RLS policies. You can customize:

```sql
-- Example: Users can only update their own profile
CREATE POLICY "Users can update own profile" ON student_profiles
    FOR UPDATE USING (auth.uid()::text = student_id::text);
```

### API Keys Configuration
Your `.env` file includes:
- `SUPABASE_ANON_KEY`: Public key for read operations
- `SUPABASE_SERVICE_ROLE_KEY`: Private key for write operations

## 🌐 Connection Architecture

```
React Frontend (Vercel)
    ↓ API Calls
Laravel Backend (Local)
    ↓ HTTP Requests  
Supabase Database (Cloud)
    ↓ Data Storage/Retrieval
```

## 🧪 Testing Your Setup

### 1. Test Basic Connection
```bash
curl http://127.0.0.1:8000/api/supabase/test
```

### 2. Test User Operations
```bash
# Get users
curl http://127.0.0.1:8000/api/supabase/users

# Create user
curl -X POST http://127.0.0.1:8000/api/supabase/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'
```

### 3. Check Supabase Dashboard
- Go to **Table Editor** in Supabase
- Verify all tables are created
- Check sample data insertion

## 🚨 Troubleshooting

### Connection Issues:
1. **Check API Keys**: Ensure keys are correctly copied
2. **Verify URL**: Make sure SUPABASE_URL is correct
3. **Test Network**: Check internet connectivity

### SQL Execution Issues:
1. **Run in Batches**: Execute script in smaller sections
2. **Check Syntax**: Ensure SQL is valid PostgreSQL
3. **Monitor Logs**: Check Supabase logs for errors

### Laravel Issues:
1. **Clear Cache**: `php artisan config:cache`
2. **Restart Server**: Stop and restart Laravel server
3. **Check Logs**: `php artisan log:clear`

## ✅ Success Indicators

You'll know everything is working when:
- ✅ All tables created in Supabase
- ✅ Laravel test endpoint returns success
- ✅ Frontend can connect to backend
- ✅ Data flows correctly through all layers

## 🎯 Next Steps

After setup is complete:
1. **Deploy Backend**: Push to cloud hosting
2. **Update Frontend**: Point React app to cloud backend
3. **Test Full Stack**: End-to-end functionality testing
4. **Monitor Performance**: Check database and API performance

---

**🎉 Your full-stack application will be ready with Supabase as the database!**
