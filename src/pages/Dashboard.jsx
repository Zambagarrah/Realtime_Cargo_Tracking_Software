// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { listConsignments } from '../services/consignmentService.js'
import ConsignmentCard from '../components/ConsignmentCard.jsx'
import Chart from '../components/Chart.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [consignments, setConsignments] = useState([])

  const [query, setQuery] = useState('')

  const filtered = consignments.filter(c =>
    c.reference.toLowerCase().includes(query.toLowerCase()) ||
    c.senderName.toLowerCase().includes(query.toLowerCase()) ||
    c.receiverName.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    listConsignments()
      .then(setConsignments)
      .catch(() => setError('Failed to load consignments.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Loading consignments..." />
  if (error) return <ErrorMessage message={error} />

  


  useEffect(() => {
    listConsignments().then(setConsignments)
  }, [])

  const statusCounts = consignments.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1
    return acc
  }, {})
  const chartData = Object.entries(statusCounts).map(([label, value]) => ({ label, value }))

  return (
    <section aria-labelledby="dashboard-title">
      <h1 id="dashboard-title">Consignment Tracking Dashboard</h1>
      {chartData.length > 0 && <Chart data={chartData} />}
      <input
        type="search"
        placeholder="Search consignments..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="card"
        style={{ marginBottom: '16px', width: '100%' }}
      />

      {filtered.map(c => <ConsignmentCard key={c.id} consignment={c} />)}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {consignments.map(c => <ConsignmentCard key={c.id} consignment={c} />)}
      </div>
    </section>
  )
}
