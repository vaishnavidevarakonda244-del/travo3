export default function Hero({ onExplore }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Curated journeys, unforgettable moments</span>
        <h1>Find your<br/><em>next adventure</em></h1>
        <p>More joy in every journey.</p>
        <button className="hero-action" onClick={onExplore}>Explore destinations <span>→</span></button>
      </div>
    </section>
  )
}
