# Supabase Edge Functions Deployment Guide

## **Overview**
Your Vercel frontend will now use Supabase Edge Functions instead of the Laravel backend. This provides a serverless, scalable solution.

## **Architecture**
```
React Frontend (Vercel) 
    HTTPS Calls
Supabase Edge Functions (Serverless)
    Direct Database Access
Supabase PostgreSQL Database (Cloud)
```

## **Deployment Steps**

### **Step 1: Install Supabase CLI**
```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Or download from: https://supabase.com/docs/reference/cli
```

### **Step 2: Link to Your Project**
```bash
# Navigate to your frontend directory
cd d:/Users/R/Documents/project_itew/project-css-mel/frontend

# Link to your Supabase project
supabase link --project-ref bivvrelxnkatpaahikvl
```

### **Step 3: Deploy Edge Functions**
```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy students
supabase functions deploy employees
```

### **Step 4: Test the Functions**
```bash
# Test student function
curl -X POST https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/students \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Student", "email": "test@example.com", "student_id": "STU001"}'
```

## **Frontend Configuration**

### **Updated API Service**
Your `frontend/src/services/api.ts` has been updated to call Supabase Edge Functions directly:

```typescript
// Before: Laravel backend
api.get('/students')

// After: Supabase Edge Functions
fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/students', {
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY',
    'Content-Type': 'application/json',
  },
})
```

### **Environment Variables**
Add these to your Vercel project:
```
NEXT_PUBLIC_SUPABASE_URL=https://bivvrelxnkatpaahikvl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## **Available Edge Functions**

### **Students API**
- `GET /functions/v1/students` - Get all students
- `GET /functions/v1/students?id=1` - Get single student
- `POST /functions/v1/students` - Create student
- `PUT /functions/v1/students?id=1` - Update student
- `DELETE /functions/v1/students?id=1` - Delete student

### **Employees API**
- `GET /functions/v1/employees` - Get all employees
- `GET /functions/v1/employees?id=1` - Get single employee
- `POST /functions/v1/employees` - Create employee
- `PUT /functions/v1/employees?id=1` - Update employee
- `DELETE /functions/v1/employees?id=1` - Delete employee

## **Benefits of This Approach**

### **Advantages:**
- **Single Platform**: Frontend and backend on same infrastructure
- **Serverless**: No server management, auto-scaling
- **Cost Effective**: Free tier available
- **Fast**: Edge locations globally
- **Secure**: Built-in authentication and RLS
- **Simple**: No deployment complexity

### **Performance:**
- **Low Latency**: Edge functions deployed globally
- **Auto-scaling**: Handles traffic spikes automatically
- **No Cold Starts**: Optimized for frequent calls

## **Testing Your Vercel App**

### **After Deployment:**
1. **Deploy Edge Functions** to Supabase
2. **Redeploy Vercel** to pick up API changes
3. **Test Student Creation** at: https://ccs-dusky.vercel.app/students
4. **Verify Data** appears in Supabase dashboard

### **Expected Flow:**
```
User clicks "Add Student" on Vercel
    Frontend calls Supabase Edge Function
    Edge Function processes request
    Data stored in Supabase PostgreSQL
    Response returned to frontend
    UI updated with new student
```

## **Troubleshooting**

### **Common Issues:**
1. **CORS Errors**: Edge functions handle CORS automatically
2. **Auth Issues**: Use correct anon key from Supabase dashboard
3. **Function Not Found**: Ensure functions are deployed
4. **Database Errors**: Check table structure in Supabase

### **Debug Steps:**
1. **Check Supabase Logs**: Dashboard > Edge Functions > Logs
2. **Test API Directly**: Use curl or Postman
3. **Verify Database**: Check tables in Supabase dashboard
4. **Monitor Network**: Use browser dev tools

## **Next Steps**

### **Additional Functions:**
- Add more Edge Functions for other features
- Implement authentication with Supabase Auth
- Add file upload capabilities
- Create real-time subscriptions

### **Production Ready:**
- Add error handling and validation
- Implement rate limiting
- Add monitoring and logging
- Set up automated deployments

---

## **Quick Start Summary**

1. **Install Supabase CLI**: `npm install -g @supabase/cli`
2. **Link Project**: `supabase link --project-ref bivvrelxnkatpaahikvl`
3. **Deploy Functions**: `supabase functions deploy`
4. **Test Vercel App**: https://ccs-dusky.vercel.app/students
5. **Verify Data**: Check Supabase dashboard

**Your full-stack app is now running entirely on Supabase!**
