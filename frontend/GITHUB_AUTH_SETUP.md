# GitHub Authentication Setup Guide

## **Overview**
Implement GitHub OAuth authentication for your Vercel app using Supabase Auth.

## **Architecture**
```
React Frontend (Vercel) 
    OAuth Flow
Supabase Auth (GitHub Provider)
    User Authentication
Supabase Database (User Profiles)
```

## **Step 1: Configure GitHub OAuth App**

### **1. Create GitHub OAuth App**
1. Go to: https://github.com/settings/applications/new
2. Fill in the form:
   - **Application name**: `CCS Campus Management`
   - **Homepage URL**: `https://ccs-gelos-projects-7fb9124e.vercel.app`
   - **Authorization callback URL**: `https://bivvrelxnkatpaahikvl.supabase.co/auth/v1/callback`
3. Click **"Register application"**

### **2. Get GitHub Credentials**
After registration, you'll get:
- **Client ID**: `xxxxxxxxxxxxxxxxxxxx`
- **Client Secret**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## **Step 2: Configure Supabase Auth**

### **1. Go to Supabase Dashboard**
- URL: https://supabase.com/dashboard/project/bivvrelxnkatpaahikvl
- Navigate to: **Authentication > Providers**

### **2. Enable GitHub Provider**
1. Find **GitHub** in the providers list
2. Click **"Enable"**
3. Fill in the GitHub credentials:
   - **Client ID**: Your GitHub app client ID
   - **Client Secret**: Your GitHub app client secret
4. **Save** the configuration

### **3. Configure Site URL**
- **Site URL**: `https://ccs-gelos-projects-7fb9124e.vercel.app`
- **Redirect URLs**: `https://ccs-gelos-projects-7fb9124e.vercel.app/**`

## **Step 3: Update Frontend**

### **1. Install Required Packages**
```bash
npm install @supabase/supabase-js
```

### **2. Environment Variables**
Add to your Vercel project:
```
NEXT_PUBLIC_SUPABASE_URL=https://bivvrelxnkatpaahikvl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### **3. Update App Component**
Wrap your app with AuthProvider:

```tsx
// App.tsx
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <YourAppComponents />
      </ProtectedRoute>
    </AuthProvider>
  )
}
```

### **4. Add Login Component**
The Login component is already created at:
- `src/components/Login.tsx`
- `src/contexts/AuthContext.tsx`
- `src/services/auth.ts`

## **Step 4: Deploy and Test**

### **1. Deploy to Vercel**
```bash
# Deploy frontend
vercel --prod

# Or push to trigger auto-deploy
git push origin main
```

### **2. Test Authentication**
1. Visit: https://ccs-gelos-projects-7fb9124e.vercel.app/login
2. Click **"Sign in with GitHub"**
3. Authorize the GitHub app
4. Redirect back to your app
5. User should be logged in

## **Step 5: User Profile Management**

### **Automatic Profile Creation**
When users authenticate:
1. User data is stored in `auth.users`
2. Profile is created/updated in `users` table
3. User session is maintained

### **Profile Data Structure**
```sql
-- users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  provider TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## **Troubleshooting**

### **Common Issues:**

#### **1. "Invalid redirect_uri"**
- **Cause**: Redirect URL doesn't match GitHub app settings
- **Fix**: Update GitHub OAuth app callback URL to: `https://bivvrelxnkatpaahikvl.supabase.co/auth/v1/callback`

#### **2. "Provider not enabled"**
- **Cause**: GitHub provider not enabled in Supabase
- **Fix**: Enable GitHub provider in Supabase dashboard

#### **3. "CORS errors"**
- **Cause**: Site URL not configured in Supabase
- **Fix**: Add your Vercel URL to Supabase site URLs

#### **4. "Authentication failed"**
- **Cause**: Incorrect GitHub credentials
- **Fix**: Verify Client ID and Secret in Supabase

### **Debug Steps:**
1. **Check Supabase Logs**: Dashboard > Authentication > Logs
2. **Verify GitHub App**: Check callback URL and permissions
3. **Test Direct Flow**: Use Supabase Auth playground
4. **Monitor Network**: Check browser dev tools for errors

## **Security Considerations**

### **Best Practices:**
- **Environment Variables**: Never expose secrets in frontend
- **HTTPS Only**: Always use HTTPS in production
- **Session Management**: Use Supabase session handling
- **User Verification**: Verify email addresses when needed

### **Row Level Security (RLS):**
```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only view/edit their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

## **Additional Features**

### **1. Multiple Providers**
Add Google, Facebook, etc.:
```typescript
// In auth.ts
async signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  })
}
```

### **2. Email/Password Auth**
```typescript
// In auth.ts
async signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email, password
  })
}
```

### **3. User Roles**
```sql
-- Add role column to users table
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';

-- Update RLS policies
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
```

## **Testing Checklist**

### **Before Deployment:**
- [ ] GitHub OAuth app created
- [ ] Supabase GitHub provider enabled
- [ ] Environment variables set
- [ ] Frontend components updated

### **After Deployment:**
- [ ] OAuth flow works end-to-end
- [ ] User profiles created in database
- [ ] Session persistence works
- [ ] Logout functionality works
- [ ] Protected routes work

---

## **Quick Start Summary**

1. **Create GitHub OAuth App** at github.com/settings/applications
2. **Configure Supabase Auth** with GitHub credentials
3. **Deploy frontend** to Vercel
4. **Test authentication** at your Vercel URL

**Your app will have secure GitHub authentication powered by Supabase!**
