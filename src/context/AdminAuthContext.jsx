import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getAdminSession, signInAdmin } from '../lib/adminApi'

const ADMIN_AUTH_TOKEN_STORAGE_KEY = 'flashboard_admin_token'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_AUTH_TOKEN_STORAGE_KEY) || '')
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token))
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(token))

  useEffect(() => {
    let isMounted = true

    const verifySession = async () => {
      if (!token) {
        setIsAuthenticated(false)
        setIsCheckingSession(false)
        return
      }

      setIsCheckingSession(true)

      try {
        await getAdminSession(token)

        if (isMounted) {
          setIsAuthenticated(true)
        }
      } catch {
        localStorage.removeItem(ADMIN_AUTH_TOKEN_STORAGE_KEY)

        if (isMounted) {
          setToken('')
          setIsAuthenticated(false)
        }
      } finally {
        if (isMounted) {
          setIsCheckingSession(false)
        }
      }
    }

    verifySession()

    return () => {
      isMounted = false
    }
  }, [token])

  const signIn = async (email, password) => {
    try {
      const session = await signInAdmin({ email, password })
      localStorage.setItem(ADMIN_AUTH_TOKEN_STORAGE_KEY, session.token)
      setToken(session.token)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Invalid email or password'
      }
    }
  }

  const signOut = () => {
    localStorage.removeItem(ADMIN_AUTH_TOKEN_STORAGE_KEY)
    setToken('')
    setIsAuthenticated(false)
  }

  const value = useMemo(
    () => ({
      token,
      isAuthenticated,
      isCheckingSession,
      signIn,
      signOut
    }),
    [token, isAuthenticated, isCheckingSession]
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)

  if (!context) {
    throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  }

  return context
}
