export default function MyBookings({ bookings, onCancel }) {
  return (
    <section className="page bookings-page">
      <div className="page-heading"><span className="section-kicker">Your journeys</span><h1>My bookings</h1></div>
      {!bookings.length ? <div className="empty-booking"><span>✈</span><h2>No trips booked yet</h2><p>Discover a destination and plan your first adventure.</p></div> : (
        <div className="booking-list">{bookings.map((booking) => (
          <article className="booking-row" key={booking.id}><div><span>Booking #{booking.id}</span><h2>{booking.package_name}</h2><p>{booking.name} · {booking.travelers} traveler(s)</p></div><div><strong>{booking.travel_date}</strong><button onClick={() => onCancel(booking.id)}>Cancel booking</button></div></article>
        ))}</div>
      )}
    </section>
  )
}
