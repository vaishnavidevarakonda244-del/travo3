import { useState } from 'react'

export default function AdminDashboard({ name, bookings, onLogout, onNavigate }) {
  const [openBooking, setOpenBooking] = useState(null)
  const [tab, setTab] = useState('overview')

  return (
    <section className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="brand-mark">T</span><strong>Travo</strong></div>
        <nav>
          <button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}><span>⌂</span>Overview</button>
          <button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}><span>▦</span>Bookings<b>{bookings.length}</b></button>
          <button onClick={() => onNavigate('destinations')}><span>⌖</span>Destinations</button>
          <button onClick={() => onNavigate('help')}><span>?</span>Help center</button>
        </nav>
        <button className="admin-signout" onClick={onLogout}>↪ Sign out</button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div><span>Administrator workspace</span><h1>{tab === 'overview' ? 'Good morning, Admin' : 'Journey bookings'}</h1></div>
          <div className="admin-person"><button className="admin-bell" aria-label="Booking notifications">◉{bookings.length > 0 && <b>{bookings.length}</b>}</button><span className="admin-photo">👤</span><div><small>Signed in</small><strong>{name}</strong></div></div>
        </header>

        {tab === 'overview' ? (
          <>
            <div className="admin-stats">
              <article><span className="stat-icon blue">▦</span><div><small>Total bookings</small><strong>{bookings.length}</strong></div></article>
              <article><span className="stat-icon green">✓</span><div><small>Confirmed trips</small><strong>{bookings.length}</strong></div></article>
              <article><span className="stat-icon orange">⌖</span><div><small>Destinations</small><strong>100</strong></div></article>
              <article><span className="stat-icon pink">★</span><div><small>Average rating</small><strong>4.8</strong></div></article>
            </div>

            <section className="admin-table-section">
              <div className="admin-section-head"><div><span>Latest activity</span><h2>Recent bookings</h2></div><button onClick={() => setTab('bookings')}>View all →</button></div>
              <BookingTable bookings={bookings} onOpen={setOpenBooking}/>
            </section>
          </>
        ) : (
          <section className="admin-table-section admin-bookings-full"><div className="admin-section-head"><div><span>Customer journeys</span><h2>All bookings</h2></div></div><BookingTable bookings={bookings} onOpen={setOpenBooking}/></section>
        )}
      </main>

      {openBooking && (
        <div className="admin-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setOpenBooking(null)}>
          <section className="admin-booking-modal"><button onClick={() => setOpenBooking(null)}>×</button><span>Booking #{openBooking.id}</span><h2>{openBooking.package_name || 'Travo journey'}</h2><div><p><small>Customer</small><strong>{openBooking.name}</strong></p><p><small>Email</small><strong>{openBooking.email}</strong></p><p><small>Travel date</small><strong>{openBooking.travel_date}</strong></p><p><small>Travelers</small><strong>{openBooking.travelers}</strong></p><p><small>Status</small><strong>Confirmed</strong></p></div></section>
        </div>
      )}
    </section>
  )
}

function BookingTable({ bookings, onOpen }) {
  if (!bookings.length) return <div className="admin-empty"><span>✦</span><h3>No bookings yet</h3><p>New customer journeys will appear here automatically.</p></div>
  return (
    <div className="booking-table-wrap"><table className="booking-table"><thead><tr><th>Customer</th><th>Destination</th><th>Travel date</th><th>Travelers</th><th>Status</th><th></th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td><span className="customer-avatar">{booking.name?.charAt(0)?.toUpperCase()}</span><strong>{booking.name}</strong></td><td>{booking.package_name || 'Travo journey'}</td><td>{booking.travel_date}</td><td>{booking.travelers}</td><td><span className="status-confirmed">Confirmed</span></td><td><button onClick={() => onOpen(booking)}>View</button></td></tr>)}</tbody></table></div>
  )
}
