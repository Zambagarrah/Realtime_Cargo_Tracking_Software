 // src/pages/Contact.jsx
import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
const form = useRef()

const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm(
      'service_zhx2qem',         // EmailJS service ID
      'template_9mto1tg',        // EmailJS template ID
    form.current,
      { publicKey: 'PpOAOLBRPnQJPwLyi' } // Your EmailJS public key
    )
    .then(() => {
    alert('Message sent successfully!')
    }, (error) => {
    console.error('FAILED...', error.text)
    alert('Oops, something went wrong.')
    })

    e.target.reset()
}

return (
    <section className="card contact-card" aria-labelledby="contact-heading">
    <div className="contact-inner">
        <h2 id="contact-heading">Contact us</h2>
        <p>If you need assistance please reach out to our admins:</p>

        <ul className="contact-list">
        <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:marvinbernard2018@gmail.com">marvinbernard2018@gmail.com</a>
        </li>
        <li>
            <strong>Phone:</strong>{' '}
            <a href="tel:+254113636517">+254 113 636 517</a>
        </li>
        </ul>

        <p>Or send us a message directly:</p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div>
            <label htmlFor="name">Name:</label>
            <input id="name" name="user_name" type="text" required />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input id="email" name="user_email" type="email" required />
        </div>
        <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required />
        </div>
        <button type="submit">Send</button>
        </form>
    </div>
    </section>
)
}
