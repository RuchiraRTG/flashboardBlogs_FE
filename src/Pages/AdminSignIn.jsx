import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function AdminSignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, signIn } = useAdminAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectPath = location.state?.from?.pathname || '/admin'

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await signIn(username, password)

    if (!result.success) {
      setError(result.message)
      setIsSubmitting(false)
      return
    }

    setError('')
    setIsSubmitting(false)
    navigate(redirectPath, { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <main className="relative min-h-screen flex items-center justify-center px-4 py-10 sm:px-6">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-7 sm:p-8"
        >
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Flashboard Admin</p>
            <h1 className="text-3xl font-black mt-2 bg-gradient-to-r from-[#b000ff] to-[#ff0f78] bg-clip-text text-transparent">
              Sign In
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              Sign in to manage blog categories, topics, and content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Enter username"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[#b000ff] to-[#ff0f78] hover:shadow-lg transition"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 text-xs text-slate-500 border-t border-slate-200 pt-4 space-y-2">
            <p>Use your admin credentials configured in the backend service.</p>
            <p>API base URL is controlled by VITE_API_BASE_URL in your frontend .env file.</p>
          </div>

          <Link
            to="/"
            className="inline-flex mt-5 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            ← Back to Homepage
          </Link>
        </motion.section>
      </main>
    </div>
  )
}
