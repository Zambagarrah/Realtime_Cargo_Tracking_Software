// src/components/ConsignmentCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function ConsignmentCard({ consignment }) {
  const {
    id, reference, senderName, receiverName, origin, destination, cargoType, status, lastUpdated
  } = consignment

  return (
    <article className="card" aria-labelledby={`c-${id}-title`}>
      <h3 id={`c-${id}-title`} style={{ marginTop: 0 }}>{reference} — {status}</h3>
      <p><strong>Sender:</strong> {senderName} | <strong>Receiver:</strong> {receiverName}</p>
      <p><strong>Route:</strong> {origin} → {destination} | <strong>Type:</strong> {cargoType}</p>
      <p><small>Updated: {new Date(lastUpdated).toLocaleString()}</small></p>
      <Link to={`/consignments/${id}`} aria-label={`View details for ${reference}`}>View details</Link>
    </article>
  )
}
