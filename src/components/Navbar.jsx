import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  return (
    <nav className="container" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link to="/" className="card">Dashboard</Link>
        {isAuthenticated && (
          <>
            <Link to="/consignments/new" className="card">New</Link>
            <Link to="/realtime" className="card">Realtime</Link>
            {user?.role === 'admin' && <Link to="/admin" className="card">Admin</Link>}
          </>
        )}
      </div>
      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="card">Login</Link>
            <Link to="/register" className="card" style={{ marginLeft: '8px' }}>Register</Link>
          </>
        ) : (
          <button className="card" onClick={logout}>Logout ({user?.role})</button>
        )}
      </div>
    </nav>
  )
}
