// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { listConsignments } from '../services/consignmentService.js'
import ConsignmentCard from '../components/ConsignmentCard.jsx'
import Chart from '../components/Chart.jsx'

export default function Dashboard() {
  const [consignments, setConsignments] = useState([])

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {consignments.map(c => <ConsignmentCard key={c.id} consignment={c} />)}
      </div>
    </section>
  )
}
