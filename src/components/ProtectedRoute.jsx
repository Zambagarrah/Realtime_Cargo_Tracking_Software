// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx'

export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, loading, user } = useContext(AuthContext)

  if (loading) {
    return <div role="status" aria-live="polite" className="container">Loading session…</div>
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (roles && !roles.includes(user?.role)) {
    return <div className="container card" role="alert">Access denied: insufficient permissions.</div>
  }
  return <Outlet />
}
