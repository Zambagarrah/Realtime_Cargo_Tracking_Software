// src/pages/ConsignmentDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getConsignmentById } from '../services/consignmentService.js'
import Map from '../components/Map.jsx'

export default function ConsignmentDetail() {
  const { id } = useParams()
  const [c, setC] = useState(null)

  useEffect(() => {
    getConsignmentById(id).then(setC)
  }, [id])

  if (!c) return <div className="card">Consignment not found.</div>

  return (
    <section aria-labelledby="detail-title">
      <h1 id="detail-title">Consignment {c.reference}</h1>
      <div className="card" style={{ marginBottom: '16px' }}>
        <p><strong>Sender:</strong> {c.senderName} ({c.senderPhone})</p>
        <p><strong>Receiver:</strong> {c.receiverName} ({c.receiverPhone})</p>
        <p><strong>Route:</strong> {c.origin} → {c.destination}</p>
        <p><strong>Type/Weight:</strong> {c.cargoType} / {c.weightKg} kg</p>
        <p><strong>Status:</strong> {c.status}</p>
        <p><small>Last updated: {new Date(c.lastUpdated).toLocaleString()}</small></p>
        {c.notes && <p><strong>Notes:</strong> {c.notes}</p>}
      </div>
      <Map center={c.currentLocation} marker={c.currentLocation} zoom={7} />
    </section>
  )
}
