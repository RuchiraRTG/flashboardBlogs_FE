import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext'
import Homepage from './Pages/Homepage'
import Adminpanel from './Pages/Adminpanel'
import BlogReader from './Pages/BlogReader'
import AdminSignIn from './Pages/AdminSignIn'

function ProtectedAdminRoute() {
  const location = useLocation()
  const { isAuthenticated, isCheckingSession } = useAdminAuth()

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-700">
        Checking admin session...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/sign-in" replace state={{ from: location }} />
  }

  return <Outlet />
}

function App() {
  return (
    <AdminAuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/blogs/:slug" element={<BlogReader />} />
            <Route path="/admin/sign-in" element={<AdminSignIn />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin/*" element={<Adminpanel />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AdminAuthProvider>
  )
}

export default App
