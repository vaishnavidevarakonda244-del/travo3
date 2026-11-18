import ChatBot from '../components/ChatBot'

export default function Help({ onNavigate }) {
  const questions = [
    ['How do I book a trip?', 'Open Destinations, choose a place, select View & book, and complete the booking form.'],
    ['Where can I view my bookings?', 'Select My bookings from the dashboard navigation.'],
    ['Can I cancel a booking?', 'Open My bookings and select Cancel booking beside your trip.'],
    ['Are the prices in Indian rupees?', 'Yes. All destinations show clear INR prices below ₹10,000.'],
  ]

  return (
    <section className="help-page">
      <div className="help-hero">
        <span className="section-kicker">Travo help center</span>
        <h1>How can we help<br/><em>your journey?</em></h1>
        <p>Find quick answers or chat automatically with Travo Assistant.</p>
      </div>

      <div className="help-layout">
        <div className="help-main">
          <span className="section-kicker">Popular questions</span>
          <h2>Everything you need to know</h2>
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
            ))}
          </div>
          <div className="help-contact">
            <div><span>Still need help?</span><h3>Talk to our travel team</h3></div>
            <div><a href="mailto:hello@travo.travel">hello@travo.travel</a><a href="tel:+1800872860">+1 800 872 860</a></div>
          </div>
        </div>
        <aside className="chat-placeholder"><ChatBot onNavigate={onNavigate}/></aside>
      </div>

      <button className="help-explore" onClick={() => onNavigate('destinations')}>Explore destinations <span>→</span></button>
    </section>
  )
}
