// src/hooks/useAuthGuard.js
import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext.jsx'

export default function useAuthGuard(requiredRole) {
  const { isAuthenticated, user } = useContext(AuthContext)
  useEffect(() => {
    // Placeholder for any side-effects related to guard
  }, [isAuthenticated, user, requiredRole])

  const allowed = isAuthenticated && (!requiredRole || user?.role === requiredRole)
  return { allowed }
}
