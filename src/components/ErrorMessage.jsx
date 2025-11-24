import React from 'react'

export default function ErrorMessage({ message }) {
  return (
    <div role="alert" className="card" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
      {message || 'Something went wrong.'}
    </div>
  )
}
