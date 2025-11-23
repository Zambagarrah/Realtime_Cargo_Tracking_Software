import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import AuthContext from '../context/AuthContext.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async e => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('Login failed. Please check your credentials.')
    }
  }

  return (
    <section className="container" aria-labelledby="login-title">
      <h1 id="login-title">Login</h1>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={onSubmit} className="card">
        <FormField label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required error={!email.includes('@') ? 'Enter a valid email' : null} />
        <FormField label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="card">Login</button>
      </form>
    </section>
  )
}
