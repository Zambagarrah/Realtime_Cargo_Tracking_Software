import React from 'react'

export default function Loader({ label = 'Loading...' }) {
  return (
    <div role="status" className="card" style={{ textAlign: 'center', padding: '24px' }}>
      <div className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}
