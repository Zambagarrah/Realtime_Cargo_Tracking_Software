import React, { useEffect, useState } from 'react'
import { listUsers, createUser, updateUser, deleteUser } from '../services/userService.js'
import { listConsignments } from '../services/consignmentService.js'
import Chart from '../components/Chart.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [consignments, setConsignments] = useState([])
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' })
  const [editing, setEditing] = useState(null)
  const [userQuery, setUserQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([listUsers(), listConsignments()])
      .then(([usersData, consignmentsData]) => {
        setUsers(usersData)
        setConsignments(consignmentsData)
      })
      .catch(() => setError('Failed to load admin data.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(userQuery.toLowerCase())
  )

  const addUser = async (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.email) return
    try {
      const u = await createUser(newUser)
      setUsers([...users, u])
      setNewUser({ name: '', email: '', role: 'user' })
    } catch {
      alert('Failed to create user.')
    }
  }

  const saveUser = async (id) => {
    try {
      const u = await updateUser(id, editing)
      setUsers(users.map(us => us.id === id ? u : us))
      setEditing(null)
    } catch {
      alert('Failed to update user.')
    }
  }

  const removeUser = async (id) => {
    try {
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
    } catch {
      alert('Failed to delete user.')
    }
  }

  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1
    return acc
  }, {})
  const userChart = Object.entries(roleCounts).map(([label, value]) => ({ label, value }))

  const statusCounts = consignments.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1
    return acc
  }, {})
  const consignmentChart = Object.entries(statusCounts).map(([label, value]) => ({ label, value }))

  if (loading) return <Loader label="Loading admin data..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <section aria-labelledby="admin-title">
      <h1 id="admin-title">Admin Panel</h1>

      <h2>Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <h3>Users by role</h3>
          <Chart data={userChart} />
        </div>
        <div>
          <h3>Consignments by status</h3>
          <Chart data={consignmentChart} />
        </div>
      </div>

      <h2 style={{ marginTop: '24px' }}>User Management</h2>

      <form onSubmit={addUser} className="card" aria-label="Create user form" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            className="card"
            placeholder="Name"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            required
            aria-label="Name"
          />
          <input
            className="card"
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            required
            aria-label="Email"
          />
          <select
            className="card"
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
            aria-label="Role"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="card">Add</button>
        </div>
      </form>

      <input
        type="search"
        placeholder="Search users..."
        value={userQuery}
        onChange={e => setUserQuery(e.target.value)}
        className="card"
        style={{ marginBottom: '16px', width: '100%' }}
        aria-label="Search users"
      />

      <ul aria-label="User list" style={{ listStyle: 'none', padding: 0 }}>
        {filteredUsers.map(u => (
          <li key={u.id} className="card" style={{ marginBottom: '12px' }}>
            {editing?.id === u.id ? (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  className="card"
                  value={editing.name}
                  onChange={e => setEditing({ ...editing, name: e.target.value })}
                  aria-label="Edit name"
                />
                <input
                  className="card"
                  type="email"
                  value={editing.email}
                  onChange={e => setEditing({ ...editing, email: e.target.value })}
                  aria-label="Edit email"
                />
                <select
                  className="card"
                  value={editing.role}
                  onChange={e => setEditing({ ...editing, role: e.target.value })}
                  aria-label="Edit role"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="card" onClick={() => saveUser(u.id)}>Save</button>
                <button className="card" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span><strong>{u.name}</strong> — {u.email} ({u.role})</span>
                <button className="card" onClick={() => setEditing(u)}>Edit</button>
                <button className="card" onClick={() => removeUser(u.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
