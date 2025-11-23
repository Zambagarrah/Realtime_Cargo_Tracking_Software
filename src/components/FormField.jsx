import React from 'react'

export default function FormField({ label, id, type = 'text', value, onChange, required, placeholder, error, ...rest }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '6px' }}>{label}{required && ' *'}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        className="card"
        style={{ width: '100%', borderColor: error ? '#dc2626' : undefined }}
        {...rest}
      />
      {error && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</p>}
    </div>
  )
}
