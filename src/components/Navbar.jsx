import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink to="/" className="card nav-link" activeClassName="active">Dashboard</NavLink>
        {isAuthenticated && (
          <>
            <NavLink to="/consignments/new" className="card" activeClassName="active">New</NavLink>
            <NavLink to="/realtime" className="card" activeClassName="active">Realtime</NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" className="card" activeClassName="active">Admin</NavLink>
            )}
          </>
        )}
      </div>
      <div className="navbar-auth">
        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className="card" activeClassName="active">Login</NavLink>
            <NavLink to="/register" className="card" activeClassName="active">Register</NavLink>
          </>
        ) : (
          <button onClick={logout}>
            Logout {user?.role && `(${user.role})`}
          </button>
        )}
      </div>
    </nav>
  )
}
