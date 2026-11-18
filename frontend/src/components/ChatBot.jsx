import { useEffect, useRef, useState } from 'react'

const responses = [
  { keys: ['book', 'booking', 'reserve'], text: 'To book a trip, open Destinations, choose a place, and select “View & book”. Complete the travel date and traveler details to confirm.' },
  { keys: ['cancel', 'remove'], text: 'Open My bookings in the navigation, then select “Cancel booking” beside the trip you want to remove.' },
  { keys: ['price', 'cost', 'rupee', 'cheap'], text: 'All featured Travo trips are shown in Indian rupees and priced below ₹10,000. You can see the exact price on every destination card.' },
  { keys: ['destination', 'place', 'where', 'trip'], text: 'Travo has 100 famous destinations across beaches, culture and adventure. Open the Destinations page to search or filter them.' },
  { keys: ['contact', 'email', 'phone', 'call'], text: 'You can reach Travo at hello@travo.travel or call +1 800 872 860.' },
]

export default function ChatBot({ onNavigate }) {
  const [open, setOpen] = useState(true)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m Travo Assistant. How can I help with your journey today?' },
  ])
  const endRef = useRef(null)

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages])

  const getReply = (text) => {
    const value = text.toLowerCase()
    if (value.includes('hello') || value.includes('hi')) return 'Hello! I’d love to help you plan something joyful.'
    const match = responses.find((item) => item.keys.some((key) => value.includes(key)))
    return match?.text || 'I can help with booking, cancellation, destination prices, travel locations or contacting Travo. What would you like to know?'
  }

  const send = (event) => {
    event.preventEvent?.()
    event.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages((items) => [...items, { from: 'user', text }])
    setInput('')
    window.setTimeout(() => setMessages((items) => [...items, { from: 'bot', text: getReply(text) }]), 350)
  }

  const quickAsk = (text) => {
    setMessages((items) => [...items, { from: 'user', text }])
    window.setTimeout(() => setMessages((items) => [...items, { from: 'bot', text: getReply(text) }]), 350)
  }

  return (
    <div className={`travobot ${open ? 'open' : ''}`}>
      {open ? (
        <section className="chat-panel" aria-label="Travo customer chatbot">
          <header><div><span className="bot-avatar">T</span><div><strong>Travo Assistant</strong><small><i/> Automatic help online</small></div></div><button onClick={() => setOpen(false)} aria-label="Close chatbot">−</button></header>
          <div className="chat-messages">
            {messages.map((message, index) => <div key={`${message.from}-${index}`} className={`chat-message ${message.from}`}>{message.text}</div>)}
            {messages.length === 1 && <div className="quick-questions"><button onClick={() => quickAsk('How do I book a trip?')}>How do I book?</button><button onClick={() => quickAsk('Can I cancel a booking?')}>Cancel a booking</button><button onClick={() => quickAsk('Show me destination prices')}>View prices</button></div>}
            <div ref={endRef}/>
          </div>
          <form className="chat-form" onSubmit={send}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your journey…" aria-label="Chat message"/><button type="submit" aria-label="Send message">→</button></form>
        </section>
      ) : <button className="chat-launcher" onClick={() => setOpen(true)} aria-label="Open Travo Assistant">T</button>}
    </div>
  )
}
