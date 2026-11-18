import { useState } from 'react'

export default function AdminProfile({ name = 'Travo Administrator', notifications = [], onOpenBooking, onLogout }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="admin-profile">
      <button className="notification-button" onClick={() => setOpen(!open)} aria-label="Admin notifications">
        <span>◉</span>{notifications.length > 0 && <b>{notifications.length}</b>}
      </button>
      <button className="profile-button" onClick={() => setOpen(!open)} aria-label="Admin profile">
        <span className="profile-avatar"><span>👤</span></span>
        <span className="profile-name"><small>Administrator</small><strong>{name}</strong></span>
        <span>⌄</span>
      </button>
      {open && (
        <div className="profile-menu">
          <div className="profile-menu-head"><span className="profile-avatar large"><span>👤</span></span><div><strong>{name}</strong><small>Admin account</small></div></div>
          <div className="notification-list">
            <h3>Booking notifications</h3>
            {notifications.length === 0 ? <p className="no-notifications">No new bookings yet.</p> : notifications.map((item) => (
              <button key={item.id} onClick={() => { onOpenBooking(item); setOpen(false) }}>
                <span>✦</span><div><strong>New journey booked</strong><small>{item.name} · {item.package_name || item.destination}</small></div>
              </button>
            ))}
          </div>
          <button className="profile-logout" onClick={onLogout}>Sign out</button>
        </div>
      )}
    </div>
  )
}
