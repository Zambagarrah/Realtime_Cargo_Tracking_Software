// src/context/AuthContext.jsx
import React, { createContext, useReducer, useEffect } from 'react'

const AuthContext = createContext(null)

const initialState = {
  user: null,        // { id, name, email, role }
  token: null,       // JWT string
  loading: true,     // while restoring session
}

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE':
      return { ...state, ...action.payload, loading: false }
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false }
    case 'LOGOUT':
      return { ...initialState, loading: false }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    if (token && userStr) {
      dispatch({ type: 'RESTORE', payload: { token, user: JSON.parse(userStr) } })
    } else {
      dispatch({ type: 'RESTORE', payload: { token: null, user: null } })
    }
  }, [])

  const login = async (email, password) => {
    // Stubbed login via service
    const { token, user } = await import('../services/authService.js')
      .then(m => m.login(email, password))
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    ...state,
    login,
    logout,
    isAuthenticated: !!state.token,
    hasRole: role => state.user?.role === role,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
