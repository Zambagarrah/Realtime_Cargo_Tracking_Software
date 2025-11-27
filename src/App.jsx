// src/App.jsx
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Contact from './pages/Contact.jsx'


export default function App() {
  const location = useLocation()
  const hideNavbarOnAuth = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {!hideNavbarOnAuth && <Navbar />}
      <main className="container">
        <Outlet  />
        
      </main>
      <footer className="container" aria-label="Footer">
        <hr />
        <p><small>© {new Date().getFullYear()} Cargo Tracker</small></p>
      </footer>
    </>
  )
}
