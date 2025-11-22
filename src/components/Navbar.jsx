// src/components/Navbar.jsx
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  return (
    <nav aria-label="Main navigation" className="container" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Link to="/" aria-label="Go to dashboard" className="card" style={{ padding: '8px 12px' }}>Dashboard</Link>
      {isAuthenticated && (
        <>
          <Link to="/consignments/new" className="card" style={{ padding: '8px 12px' }}>New Consignment</Link>
          <Link to="/realtime" className="card" style={{ padding: '8px 12px' }}>Realtime Tracking</Link>
          {user?.role === 'admin' && <Link to="/admin" className="card" style={{ padding: '8px 12px' }}>Admin Panel</Link>}
        </>
      )}
      <div style={{ marginLeft: 'auto' }}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="card" style={{ padding: '8px 12px' }}>Login</Link>
            <Link to="/register" className="card" style={{ padding: '8px 12px', marginLeft: '8px' }}>Register</Link>
          </>
        ) : (
          <button className="card" onClick={logout} aria-label="Logout" style={{ padding: '8px 12px' }}>
            Logout ({user?.role})
          </button>
        )}
      </div>
    </nav>
  )
}
