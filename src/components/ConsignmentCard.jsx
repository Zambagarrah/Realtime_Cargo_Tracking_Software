// src/components/ConsignmentCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function ConsignmentCard({ consignment }) {
  const {
    id, reference, senderName, receiverName, origin, destination, cargoType, status, lastUpdated
  } = consignment

  return (
    <Link to={`/consignments/${id}`} aria-label={`View details for ${reference}`}>
      <article className="card cargo-card" aria-labelledby={`c-${id}-title`}>
        <h3 id={`c-${id}-title`} className="cargo-title">
          {reference} <span className={`status ${status.toLowerCase()}`}>{status}</span>
        </h3>

        <p><strong>Sender:</strong> {senderName} | <strong>Receiver:</strong> {receiverName}</p>
        <p><strong>Route:</strong> {origin} → {destination}</p>
        <p><strong>Type:</strong> {cargoType}</p>
        <p className="cargo-updated"><small>Updated: {new Date(lastUpdated).toLocaleString()}</small></p>
      </article>
    </Link>
  )
}
