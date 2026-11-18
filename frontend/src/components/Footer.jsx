export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-brand"><span className="brand-mark">T</span><strong>Travo</strong><p>More joy in every journey.</p></div>
      <div><h3>Explore</h3><button onClick={() => onNavigate('destinations')}>Destinations</button><button onClick={() => onNavigate('bookings')}>My bookings</button></div>
      <div><h3>Contact</h3><a href="mailto:hello@travo.travel">hello@travo.travel</a><span>+1 800 872 860</span></div>
    </footer>
  )
}
