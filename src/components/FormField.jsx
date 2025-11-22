// src/components/FormField.jsx
import React from 'react'

export default function FormField({ label, id, type = 'text', value, onChange, required, placeholder, ...rest }) {
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
        className="card"
        style={{ width: '100%' }}
        {...rest}
      />
    </div>
  )
}
