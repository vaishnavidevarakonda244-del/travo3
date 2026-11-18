import { useEffect, useState } from 'react'

export default function BookingModal({ item, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', date: '', travelers: 2 })

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  if (!item) return null

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = (event) => {
    event.preventDefault()
    onSubmit({ ...form, packageId: item.id })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" onClick={onClose} aria-label="Close booking form">×</button>
        <span className="section-kicker">Book your journey</span>
        <h2 id="booking-title">{item.name}</h2>
        <p className="modal-location">{item.country} · From {item.price} per traveler</p>
        <form onSubmit={submit}>
          <label>Full name<input name="name" value={form.name} onChange={update} required placeholder="Your name"/></label>
          <label>Email address<input name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com"/></label>
          <div className="form-row">
            <label>Travel date<input name="date" type="date" value={form.date} onChange={update} required/></label>
            <label>Travelers<input name="travelers" type="number" min="1" max="12" value={form.travelers} onChange={update} required/></label>
          </div>
          <button className="submit-booking" type="submit">Confirm booking</button>
        </form>
      </section>
    </div>
  )
}
