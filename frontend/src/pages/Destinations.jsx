import { useMemo, useState } from 'react'
import PackageCard from '../components/PackageCard'

export default function Destinations({ destinations, liked, onLike, onBook }) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const categories = ['All', 'Beach', 'Culture', 'Adventure']
  const shown = useMemo(() => destinations.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category
    const searchMatch = `${item.name} ${item.country}`.toLowerCase().includes(search.toLowerCase())
    return categoryMatch && searchMatch
  }), [destinations, category, search])

  return (
    <section className="page destinations-page">
      <div className="page-heading"><span className="section-kicker">Find your escape</span><h1>Destinations</h1><p>Explore 100 famous places around the world.</p></div>
      <div className="destination-toolbar">
        <input className="destination-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search country or destination" aria-label="Search destinations"/>
        <div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      {shown.length ? <div className="destination-grid">{shown.map((item) => <PackageCard key={item.id} item={item} liked={liked.includes(item.id)} onLike={onLike} onBook={onBook}/>)}</div> : <p className="empty-state">No destinations match your search.</p>}
    </section>
  )
}
