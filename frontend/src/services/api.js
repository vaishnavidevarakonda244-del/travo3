const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000/api`

export async function getDestinations(category = '') {
  const url = category ? `${API_URL}/destinations?category=${encodeURIComponent(category)}` : `${API_URL}/destinations`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Unable to load destinations')
  return response.json()
}

export async function getBookings() {
  const response = await fetch(`${API_URL}/bookings`)
  if (!response.ok) throw new Error('Unable to load bookings')
  return response.json()
}

export async function createBooking(booking) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(booking),
  })
  if (!response.ok) throw new Error('Unable to create booking')
  return response.json()
}

export async function cancelBooking(id) {
  const response = await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Unable to cancel booking')
  return response.json()
}
