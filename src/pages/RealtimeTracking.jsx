// src/pages/RealtimeTracking.jsx
import React, { useEffect, useState } from 'react'
import Map from '../components/Map.jsx'
import { getConsignmentById, updateConsignment } from '../services/consignmentService.js'

export default function RealtimeTracking() {
  const [c, setC] = useState(null)

  useEffect(() => {
    // For demo, track the first consignment
    getConsignmentById('c-1001').then(setC)
  }, [])

  useEffect(() => {
    if (!c) return
    const interval = setInterval(async () => {
      // Randomly nudge coordinates to simulate movement
      const jitter = () => (Math.random() - 0.5) * 0.02
      const updatedLoc = {
        lat: c.currentLocation.lat + jitter(),
        lng: c.currentLocation.lng + jitter(),
      }
      const updated = await updateConsignment(c.id, { currentLocation: updatedLoc, status: 'In Transit' })
      setC(updated)
    }, 2000)
    return () => clearInterval(interval)
  }, [c])

  if (!c) return <div className="card">Loading tracking…</div>

  return (
    <section aria-labelledby="rt-title">
      <h1 id="rt-title">Realtime Location</h1>
      <div className="card" style={{ marginBottom: '16px' }}>
        <p><strong>Consignment:</strong> {c.reference} — {c.status}</p>
        <p>
          <strong>Current coords:</strong> {c.currentLocation.lat.toFixed(5)}, {c.currentLocation.lng.toFixed(5)}
        </p>
      </div>
      <Map center={c.currentLocation} marker={c.currentLocation} zoom={9} />
    </section>
  )
}
