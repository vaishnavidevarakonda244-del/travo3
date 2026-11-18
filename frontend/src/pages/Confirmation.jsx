import { useEffect, useState } from 'react'

export default function Confirmation({ destination, booking, onHome, onBookings }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`confirmation-page ${visible ? 'visible' : ''}`}>
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => <i key={index} style={{ '--i': index }}/>)}
      </div>
      <div className="confirmation-card">
        <div className="confirmed-badge"><span>✓</span></div>
        <span className="section-kicker">Payment successful</span>
        <h1>Your journey is confirmed!</h1>
        <p className="confirmation-line">Pack your curiosity—beautiful memories are waiting in <strong>{destination.name}</strong>.</p>
        <div className="confirmation-route"><div><small>From</small><strong>{booking.startingPlace}</strong></div><span>✈</span><div><small>To</small><strong>{booking.endingPlace}</strong></div></div>
        <div className="confirmation-details"><div><span>Destination</span><strong>{destination.name}</strong></div><div><span>Travel date</span><strong>{booking.date}</strong></div><div><span>Travelers</span><strong>{booking.travelers}</strong></div><div><span>Payment</span><strong>{booking.bank}</strong></div></div>
        <p className="confirmation-note">“Collect moments, not things. Your next joyful story begins now.”</p>
        <div className="confirmation-actions"><button className="confirmation-secondary" onClick={onHome}>Back to home</button><button onClick={onBookings}>View my bookings</button></div>
      </div>
    </section>
  )
}
