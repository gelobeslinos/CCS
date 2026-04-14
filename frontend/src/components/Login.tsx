import React, { useState, useEffect } from 'react'
import { authService } from '../services/auth'

interface LoginProps {
  onLogin: (user: any) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        if (user) {
          onLogin(user)
        }
      } catch (err) {
        console.error('Auth check failed:', err)
      }
    }
    checkAuth()
  }, [onLogin])

  const handleGitHubLogin = async () => {
    setLoading(true)
    setError(null)
    
    try {
      await authService.signInWithGitHub()
      // The redirect will handle the rest
    } catch (err: any) {
      setError(err.message || 'Failed to login with GitHub')
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    
    try {
      await authService.signInWithGoogle()
      // The redirect will handle the rest
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google')
      setLoading(false)
    }
  }

  const handleEmailLogin = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { user } = await authService.signInWithEmail(email, password)
      onLogin(user)
    } catch (err: any) {
      setError(err.message || 'Failed to login')
      setLoading(false)
    }
  }

  const handleEmailSignup = async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { user } = await authService.signUpWithEmail(email, password, name)
      if (user) {
        onLogin(user)
      } else {
        setError('Please check your email to verify your account')
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up')
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <h2 style={styles.title}>Welcome to CCS</h2>
        <p style={styles.subtitle}>Sign in to manage your campus</p>
        
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        {/* OAuth Login Options */}
        <div style={styles.oauthSection}>
          <button
            onClick={handleGitHubLogin}
            disabled={loading}
            style={styles.githubButton}
          >
            {loading ? 'Connecting...' : 'Sign in with GitHub'}
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={styles.googleButton}
          >
            {loading ? 'Connecting...' : 'Sign in with Google'}
          </button>
        </div>

        <div style={styles.divider}>
          <span style={styles.dividerText}>OR</span>
        </div>

        {/* Email Login Form */}
        <EmailLoginForm
          onLogin={handleEmailLogin}
          onSignup={handleEmailSignup}
          loading={loading}
        />
      </div>
    </div>
  )
}

// Email Login Form Component
const EmailLoginForm: React.FC<{
  onLogin: (email: string, password: string) => void
  onSignup: (email: string, password: string, name: string) => void
  loading: boolean
}> = ({ onLogin, onSignup, loading }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLogin) {
      onLogin(formData.email, formData.password)
    } else {
      onSignup(formData.email, formData.password, formData.name)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.emailForm}>
      {!isLogin && (
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={styles.input}
          required
        />
      )}
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        style={styles.input}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        style={styles.input}
        required
      />
      
      <button
        type="submit"
        disabled={loading}
        style={styles.submitButton}
      >
        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
      </button>
      
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        style={styles.toggleButton}
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </form>
  )
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  loginCard: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  },
  errorBox: {
    background: '#fee',
    color: '#c33',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  oauthSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  githubButton: {
    background: '#24292e',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  googleButton: {
    background: '#4285f4',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  dividerText: {
    padding: '0 15px',
    color: '#666',
    fontSize: '14px',
  },
  emailForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
  },
  submitButton: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
  },
}

export default Login
