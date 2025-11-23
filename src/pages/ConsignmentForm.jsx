import React, { useState } from 'react'
import FormField from '../components/FormField.jsx'
import { createConsignment } from '../services/consignmentService.js'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function ConsignmentForm() {
  const [form, setForm] = useState({
    senderName: '', receiverName: '', origin: '', destination: '',
    cargoType: '', weightKg: '', lat: '', lng: '', notes: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const update = key => e => setForm({ ...form, [key]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    if (!form.senderName || !form.receiverName || !form.origin || !form.destination) {
      setError('Please fill all required fields.')
      return
    }
    const payload = {
      ...form,
      weightKg: Number(form.weightKg || 0),
      currentLocation: { lat: Number(form.lat || -4.0435), lng: Number(form.lng || 39.6682) },
    }
    const newC = await createConsignment(payload)
    navigate(`/consignments/${newC.id}`)
  }

  return (
    <section>
      <h1>Create Consignment</h1>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={onSubmit} className="card">
        <FormField label="Sender name" id="senderName" value={form.senderName} onChange={update('senderName')} required />
        <FormField label="Receiver name" id="receiverName" value={form.receiverName} onChange={update('receiverName')} required />
        <FormField label="Origin" id="origin" value={form.origin} onChange={update('origin')} required />
        <FormField label="Destination" id="destination" value={form.destination} onChange={update('destination')} required />
        <FormField label="Receiver phone" id="receiverPhone" type="tel" value={form.receiverPhone} onChange={update('receiverPhone')} />
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
    </section>
  )
}
