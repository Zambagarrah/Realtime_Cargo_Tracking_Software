// src/App.jsx
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'



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
<div className="footer-content">
    <div className="footer-brand">
      <h4>Cargo Tracker</h4>
      <p><small>© {new Date().getFullYear()} Cargo Tracker. All rights reserved.</small></p>
    </div>

    

    <div className="footer-contact">
      <p><strong>Email:</strong> <a href="mailto:marvinbernard2018@gmail.com">marvinbernard2018@gmail.com</a></p>
      <p><strong>Phone:</strong> <a href="tel:+254113636517">+254 113 636 517</a></p>
    </div>
  </div>
      </footer>
    </>
  )
}
