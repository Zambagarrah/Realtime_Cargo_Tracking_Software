import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container" aria-labelledby="notfound-title">
      <h1 id="notfound-title">404 – Page Not Found</h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/" className="card">Go back to Dashboard</Link>
    </section>
  )
}
