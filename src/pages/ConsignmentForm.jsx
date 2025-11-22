// src/pages/ConsignmentForm.jsx
import React, { useState } from 'react'
import FormField from '../components/FormField.jsx'
import { createConsignment } from '../services/consignmentService.js'
import { useNavigate } from 'react-router-dom'

export default function ConsignmentForm() {
  const [form, setForm] = useState({
    senderName: '', senderPhone: '', receiverName: '', receiverPhone: '',
    origin: '', destination: '', cargoType: '', weightKg: '', status: 'Pending',
    lat: '', lng: '', notes: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    setError(null)
    // Basic validation
    if (!form.senderName || !form.receiverName || !form.origin || !form.destination) {
      setError('Please fill all required fields.')
      return
    }
    const payload = {
      senderName: form.senderName,
      senderPhone: form.senderPhone,
      receiverName: form.receiverName,
      receiverPhone: form.receiverPhone,
      origin: form.origin,
      destination: form.destination,
      cargoType: form.cargoType,
      weightKg: Number(form.weightKg || 0),
      status: form.status,
      currentLocation: { lat: Number(form.lat || -4.0435), lng: Number(form.lng || 39.6682) },
      notes: form.notes,
    }
    const newC = await createConsignment(payload)
    navigate(`/consignments/${newC.id}`)
  }

  return (
    <section aria-labelledby="new-title">
      <h1 id="new-title">Create Consignment</h1>
      {error && <div role="alert" className="card" style={{ marginBottom: '12px' }}>{error}</div>}
      <form onSubmit={onSubmit} className="card" aria-describedby="new-help">
        <FormField label="Sender name" id="senderName" value={form.senderName} onChange={update('senderName')} required />
        <FormField label="Sender phone" id="senderPhone" type="tel" value={form.senderPhone} onChange={update('senderPhone')} />
        <FormField label="Receiver name" id="receiverName" value={form.receiverName} onChange={update('receiverName')} required />
        <FormField label="Receiver phone" id="receiverPhone" type="tel" value={form.receiverPhone} onChange={update('receiverPhone')} />
        <FormField label="Origin" id="origin" value={form.origin} onChange={update('origin')} required />
        <FormField label="Destination" id="destination" value={form.destination} onChange={update('destination')} required />
        <FormField label="Cargo type" id="cargoType" value={form.cargoType} onChange={update('cargoType')} />
        <FormField label="Weight (kg)" id="weightKg" type="number" value={form.weightKg} onChange={update('weightKg')} />
        <FormField label="Status" id="status" value={form.status} onChange={update('status')} />
        <div style={{ display: 'flex', gap: '12px' }}>
          <FormField label="Latitude" id="lat" type="number" value={form.lat} onChange={update('lat')} placeholder="-4.0435" />
          <FormField label="Longitude" id="lng" type="number" value={form.lng} onChange={update('lng')} placeholder="39.6682" />
        </div>
        <FormField label="Notes" id="notes" value={form.notes} onChange={update('notes')} />
        <button type="submit" className="card">Create</button>
      </form>
      <p id="new-help"><small>Provide coordinates for first known location, or leave defaults.</small></p>
    </section>
  )
}
