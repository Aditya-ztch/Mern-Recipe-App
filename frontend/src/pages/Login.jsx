import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../api'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [identifier, setIdentifier] = useState('') // username or email
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!identifier.trim()) {
      setError('Username/email is required')
      toast.error('Username/email is required')
      return
    }
    if (!password) {
      setError('Password is required')
      toast.error('Password is required')
      return
    }

    const payload = { email: identifier.trim(), password }

    try {
      const data = await loginUser(payload)
      login({
        user: data.FoundUser,
        token: data.token,
      })
      toast.success('Login successful!')
      navigate('/recipes')
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    }
  }

  return (
    <div className="login-page" style={{ maxWidth: 420, margin: '0 auto', padding: 16 }}>
      <h2 style={{ marginBottom: 8 }}>Login</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>Sign in with your username or email.</p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Username or Email</span>
          <input
            type="text"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. you@example.com"
            autoComplete="username"
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </label>

        {error ? (
          <div role="alert" style={{ color: '#b00020', fontSize: 14 }}>
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            background: '#2563eb',
            color: 'white',
            fontWeight: 600,
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/register')}
          style={{
            padding: 12,
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            background: '#45e448',
            color: 'white',
            fontWeight: 600,
          }}
        >
          New User? Register
        </button>
      </form>
    </div>
  )
}

export default Login