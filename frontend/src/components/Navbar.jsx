export default function Navbar({ page, onNavigate, user, onOpenLogin }) {
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary navigation">
        <button className="brand" onClick={() => onNavigate('home')} aria-label="Travo home">
          <span className="brand-mark">T</span><span>Travo</span>
        </button>
        <div className="nav-links">
          <button className={page === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>Home</button>
          <button className={page === 'destinations' ? 'active' : ''} onClick={() => onNavigate('destinations')}>Destinations</button>
          <button className={page === 'about' ? 'active' : ''} onClick={() => onNavigate('about')}>About</button>
          <button className={page === 'help' ? 'active' : ''} onClick={() => onNavigate('help')}>Help</button>
          <button className={page === 'bookings' ? 'active' : ''} onClick={() => onNavigate('bookings')}>My bookings</button>
        </div>
        {user ? (
          <button className="profile-header-button" onClick={() => onOpenLogin('profile')}><span>👤</span>{user.role === 'admin' ? 'Admin' : user.name}</button>
        ) : (
          <div className="login-actions"><button onClick={() => onOpenLogin('customer')}>Customer login</button><button onClick={() => onOpenLogin('admin')}>Admin login</button></div>
        )}
      </nav>
    </header>
  )
}
/* In frontend/src/styles/App.css or your Navbar CSS */
.navbar {
  background-color: rgba(15, 23, 42, 0.95); /* Dark solid background with slight transparency */
  backdrop-filter: blur(8px);
  color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar a, .nav-links {
  color: #f8fafc !important; /* Force high-contrast white text */
  font-weight: 500;
}

.navbar a:hover {
  color: #38bdf8 !important; /* Bright accent color on hover */
}