import { useMemo, useState } from 'react'

const BANKS = [
  { name: 'State Bank of India', short: 'SBI' },
  { name: 'HDFC Bank', short: 'HDFC' },
  { name: 'ICICI Bank', short: 'ICICI' },
  { name: 'Axis Bank', short: 'AXIS' },
  { name: 'Bank of Baroda', short: 'BOB' },
  { name: 'Punjab National Bank', short: 'PNB' },
]

export default function Payment({ destination, booking, onCancel, onConfirm }) {
  const [bank, setBank] = useState('')
  const [agreed, setAgreed] = useState(false)

  const amount = useMemo(() => {
    const value = Number(destination.price.replace(/[^0-9]/g, '')) || 0
    return value * Number(booking.travelers || 1)
  }, [destination, booking])

  const confirm = (event) => {
    event.preventDefault()
    if (!bank) return
    onConfirm({ ...booking, bank, amount })
  }

  return (
    <section className="payment-page">
      <header className="payment-header"><div className="brand"><span className="brand-mark">T</span><strong>Travo Secure Pay</strong></div><span>256-bit secure checkout</span></header>
      <div className="payment-layout">
        <main className="payment-main">
          <button className="payment-back" onClick={onCancel}>← Back to journey</button>
          <span className="section-kicker">Secure payment</span>
          <h1>Choose your net banking</h1>
          <p className="payment-intro">Select a bank to continue through a safe demo checkout. Travo will never ask for your banking password or PIN here.</p>

          <form onSubmit={confirm}>
            <div className="bank-grid">
              {BANKS.map((item) => (
                <label key={item.short} className={`bank-card ${bank === item.name ? 'selected' : ''}`}>
                  <input type="radio" name="bank" value={item.name} checked={bank === item.name} onChange={() => setBank(item.name)} />
                  <span className="bank-logo">{item.short}</span>
                  <strong>{item.name}</strong>
                  <span className="bank-check">✓</span>
                </label>
              ))}
            </div>

            <label className="payment-agree"><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} /><span>I confirm that this is a demo payment and I agree to the Travo booking terms.</span></label>

            <div className="payment-actions">
              <button type="button" className="payment-cancel" onClick={onCancel}>Cancel</button>
              <button type="submit" className="payment-confirm" disabled={!bank || !agreed}>Confirm payment</button>
            </div>
          </form>
        </main>

        <aside className="payment-summary">
          <span className="section-kicker">Payment summary</span>
          <img src={destination.image} alt={destination.name}/>
          <h2>{destination.name}</h2>
          <p>{destination.country}</p>
          <div className="summary-route"><span>{booking.startingPlace}</span><b>→</b><span>{booking.endingPlace}</span></div>
          <div className="summary-lines"><div><span>Trip price × {booking.travelers}</span><strong>₹{amount.toLocaleString('en-IN')}</strong></div><div><span>Service fee</span><strong>₹0</strong></div><div className="summary-total"><span>Total payable</span><strong>₹{amount.toLocaleString('en-IN')}</strong></div></div>
        </aside>
      </div>
    </section>
  )
}
