import Hero from '../components/Hero'
import PackageCard from '../components/PackageCard'

export default function Home({ destinations, liked, onLike, onBook, onNavigate }) {
  return (
    <>
      <Hero onExplore={() => onNavigate('destinations')}/>
      <section className="destinations" id="destinations">
        <div className="section-heading">
          <div><span className="section-kicker">Explore the world</span><h2>Popular destinations</h2></div>
          <button className="text-link" onClick={() => onNavigate('destinations')}>View all <span>→</span></button>
        </div>
        <div className="destination-grid">
          {destinations.slice(0, 4).map((item) => <PackageCard key={item.id} item={item} liked={liked.includes(item.id)} onLike={onLike} onBook={onBook}/>)}
        </div>
      </section>
      <section className="promise"><div><span>Why travel with Travo</span><h2>Every detail,<br/><em>thoughtfully taken care of</em></h2></div><p>Handpicked stays, local guides, and seamless itineraries—so you can be fully present for every moment.</p></section>
    </>
  )
}
