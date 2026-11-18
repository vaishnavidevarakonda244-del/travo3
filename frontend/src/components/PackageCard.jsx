export default function PackageCard({ item, liked, onLike, onBook }) {
  return (
    <article className="destination-card">
      <div className="card-image">
        <img src={item.image} alt={`${item.name}, ${item.country}`}/>
        <button className={`heart-button ${liked ? 'liked' : ''}`} onClick={() => onLike(item.id)} aria-label={`Save ${item.name}`}>♥</button>
      </div>
      <div className="card-details">
        <div><span>{item.country}</span><h3>{item.name}</h3>{item.special && <p className="card-special">{item.special}</p>}</div>
        <div className="card-price"><strong>{item.price}</strong><small>★ {item.rating}</small></div>
      </div>
      <button className="card-book" onClick={() => onBook(item)}>Book now <span>→</span></button>
    </article>
  )
}
