import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService } from '../services/auth'
import Login from '../components/Login'

interface User {
  id: string  // UUID from Supabase Auth
  email?: string
  name?: string
  avatar_url?: string
  provider?: string
  role_id?: number  // Reference to roles table
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
        
        // Listen for auth changes
        const { data: { subscription } } = authService.onAuthStateChange((authUser) => {
          setUser(authUser)
        })

        return () => {
          if (subscription) subscription.unsubscribe()
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
      } finally {
        setLoading(false)
      }
    }

    const unsubscribe = initializeAuth()

    // Handle OAuth redirect
    const handleAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      
      if (code) {
        try {
          // Supabase handles the OAuth callback automatically
          const currentUser = await authService.getCurrentUser()
          setUser(currentUser)
          
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname)
        } catch (error) {
          console.error('OAuth callback failed:', error)
        }
      }
    }

    handleAuthRedirect()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    
    // Create/update user profile in database
    if (userData.email) {
      authService.updateUserProfile(userData.id, {
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        avatar_url: userData.avatar_url,
      }).catch(console.error)
    }
  }

  const logout = async () => {
    try {
      await authService.signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Protected Route Component
export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
      }}>
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => {}} />
  }

  return <>{children}</>
}

export default AuthContext
