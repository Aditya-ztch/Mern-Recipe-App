import { createContext, useContext, useState } from 'react'
import { getAuthUser, saveAuthUser, clearAuthUser } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => getAuthUser())

  const login = (authData) => {
    saveAuthUser(authData)
    setAuth(authData)
  }

  const logout = () => {
    clearAuthUser()
    setAuth(null)
  }

  const value = {
    auth,
    user: auth?.user || null,
    isAuthenticated: Boolean(auth?.user),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}