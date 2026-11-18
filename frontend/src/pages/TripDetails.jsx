import { useMemo, useState } from 'react'

const STOP_LIBRARY = {
  India: ['Hidden viewpoint', 'Historic old town', 'Local nature trail'],
  Beach: ['Sunrise shoreline', 'Scenic seaside village', 'Sunset coastal point'],
  Culture: ['Heritage quarter', 'Traditional market', 'Historic viewpoint'],
  Adventure: ['Mountain lake', 'Forest trail', 'Panoramic valley'],
  Default: ['Beautiful lakeside', 'Local cultural village', 'Scenic sunset point'],
}

export default function TripDetails({ destination, onBack, onSubmit }) {
  const [startingPlace, setStartingPlace] = useState(destination.country === 'India' ? 'New Delhi' : 'My current city')
  const [travelDate, setTravelDate] = useState('')
  const [travelers, setTravelers] = useState(2)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const stops = useMemo(() => {
    const pool = destination.country === 'India'
      ? STOP_LIBRARY.India
      : STOP_LIBRARY[destination.category] || STOP_LIBRARY.Default
    return pool.map((stop, index) => ({
      name: `${stop} ${index + 1}`,
      description: index === 0 ? 'A peaceful introduction to the journey' : index === 1 ? 'Discover local food, culture and beautiful views' : 'Finish the route with a memorable scenic experience',
      icon: ['◉', '◆', '★'][index],
    }))
  }, [destination])

  const submit = (event) => {
    event.preventDefault()
    onSubmit({
      packageId: destination.id,
      name,
      email,
      date: travelDate,
      travelers,
      startingPlace,
      endingPlace: `${destination.name}, ${destination.country}`,
    })
  }

  if (!destination) return null

  return (
    <section className="trip-page">
      <div className="trip-hero">
        <img src={destination.image} alt={`${destination.name}, ${destination.country}`}/>
        <div className="trip-hero-overlay">
          <button className="trip-back" onClick={onBack}>← Destinations</button>
          <div><span>Starting soon at</span><h1>{destination.name}</h1><p>{destination.country} · {destination.special}</p></div>
        </div>
      </div>

      <div className="trip-content">
        <div className="journey-details">
          <div className="journey-heading"><span className="section-kicker">Your journey</span><h2>Route highlights</h2></div>

          <div className="route-card">
            <div className="route-point"><span className="route-dot start">A</span><div><small>Starting place</small><strong>{startingPlace}</strong></div></div>
            {stops.map((stop, index) => (
              <div className="route-stop" key={stop.name}><span className="route-icon">{stop.icon}</span><div><small>Stop {index + 1}</small><strong>{stop.name}</strong><p>{stop.description}</p></div></div>
            ))}
            <div className="route-point"><span className="route-dot end">B</span><div><small>Beautiful ending place</small><strong>{destination.name}, {destination.country}</strong></div></div>
          </div>

          <div className="trip-summary"><div><span>Journey style</span><strong>{destination.category}</strong></div><div><span>Trip rating</span><strong>★ {destination.rating}</strong></div><div><span>Starting from</span><strong>{destination.price}</strong></div></div>
        </div>

        <aside className="trip-booking">
          <span className="section-kicker">Plan this trip</span>
          <h2>Reserve your journey</h2>
          <form onSubmit={submit}>
            <label>Starting place<input value={startingPlace} onChange={(event) => setStartingPlace(event.target.value)} required placeholder="City or airport"/></label>
            <label>Ending place<input value={`${destination.name}, ${destination.country}`} readOnly/></label>
            <label>Full name<input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Your name"/></label>
            <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="you@example.com"/></label>
            <div className="trip-form-row"><label>Travel date<input type="date" value={travelDate} onChange={(event) => setTravelDate(event.target.value)} required/></label><label>Travelers<input type="number" min="1" max="12" value={travelers} onChange={(event) => setTravelers(event.target.value)} required/></label></div>
            <div className="trip-total"><span>Starting price</span><strong>{destination.price}</strong></div>
            <button type="submit">Confirm journey</button>
          </form>
        </aside>
      </div>
    </section>
  )
}
