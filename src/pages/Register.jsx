// src/pages/Register.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import { register } from '../services/authService.js'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async e => {
    e.preventDefault()
    const res = await register({ name, email })
    if (res?.success) {
      setSuccess('Registration successful. You can now log in.')
      setTimeout(() => navigate('/login'), 800)
    }
  }

  return (
    <section className="container" aria-labelledby="register-title">
      <h1 id="register-title">Register</h1>
      {success && <div role="status" className="card" style={{ marginBottom: '12px' }}>{success}</div>}
      <form onSubmit={onSubmit} className="card">
        <FormField label="Name" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <FormField label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <FormField label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="card" aria-label="Submit registration">Create account</button>
      </form>
    </section>
  )
}
