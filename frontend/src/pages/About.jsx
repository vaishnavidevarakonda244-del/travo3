export default function About({ onNavigate }) {
  return (
    <section className="about-page">
      <div className="about-hero">
        <div className="about-hero-copy">
          <span className="section-kicker">Our story</span>
          <h1>Travel that feels<br/><em>personal</em></h1>
          <p>At Travo, every journey begins with curiosity. We bring beautiful places, local stories and thoughtful details together—so every traveler can make memories that stay.</p>
          <button className="about-primary" onClick={() => onNavigate('destinations')}>Explore destinations <span>→</span></button>
        </div>
      </div>

      <div className="about-intro">
        <span className="section-kicker">More joy in every journey</span>
        <h2>We believe the best trips<br/>are the ones that feel effortless</h2>
        <p>From quiet mountain escapes to sunlit coastal towns, Travo helps you discover places chosen for their beauty, character and unforgettable experiences.</p>
      </div>

      <div className="about-values">
        <article><span className="value-number">01</span><div><h3>Thoughtfully curated</h3><p>Every destination is selected for memorable landscapes, local culture and meaningful experiences.</p></div></article>
        <article><span className="value-number">02</span><div><h3>Made for every traveler</h3><p>Whether you seek adventure, calm or discovery, find a journey that matches your own rhythm.</p></div></article>
        <article><span className="value-number">03</span><div><h3>Simple and transparent</h3><p>Explore clear Indian-rupee prices and enjoy a booking experience designed to be quick and easy.</p></div></article>
      </div>

      <div className="about-stats">
        <div><strong>100</strong><span>Destinations</span></div>
        <div><strong>4.8</strong><span>Average rating</span></div>
        <div><strong>24/7</strong><span>Travel assistance</span></div>
        <div><strong>₹10k</strong><span>Friendly starting trips</span></div>
      </div>

      <div className="about-cta">
        <div><span className="section-kicker">Your next chapter</span><h2>Where will your joy<br/>take you next?</h2></div>
        <button onClick={() => onNavigate('destinations')}>Start exploring <span>→</span></button>
      </div>
    </section>
  )
}
