// src/pages/Contact.jsx
import React, { useState } from 'react'

export default function Contact() {
const [formData, setFormData] = useState({ name: '', email: '', message: '' })

const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
}

const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just log the data. Later, connect to backend.
    console.log('Contact form submitted:', formData)
    alert('Thank you for reaching out! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' }) // reset form
}

return (
    <section className="card contact-card" aria-labelledby="contact-heading">
    <div className="contact-inner">
        <h2 id="contact-heading">Contact us</h2>
        <p>If you need assistance please reach out to our admins:</p>

        <ul className="contact-list">
        <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@cargoapp.com">support@cargoapp.com</a>
        </li>
        <li>
            <strong>Phone:</strong>{' '}
            <a href="tel:+254113636517">+254 113 636 517</a>
        </li>
        </ul>

        <p>Or send us a message directly:</p>

        <form onSubmit={handleSubmit} className="contact-form">
        <div>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required />
        </div>
        <button type="submit">Send</button>
        </form>
    </div>
    </section>
)
}
