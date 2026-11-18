import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import MyBookings from './pages/MyBookings'
import About from './pages/About'
import Help from './pages/Help'
import TripDetails from './pages/TripDetails'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import CustomerLogin from './pages/CustomerLogin'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminProfile from './components/AdminProfile'
import { cancelBooking, createBooking, getBookings, getDestinations } from './services/api'
import './styles/App.css'
import './styles/Payment.css'

export default function App() {
	const [page, setPage] = useState('home')
	const [destinations, setDestinations] = useState([])
	const [bookings, setBookings] = useState([])
	const [liked, setLiked] = useState([])
	const [selectedPackage, setSelectedPackage] = useState(null)
	const [selectedTrip, setSelectedTrip] = useState(null)
	const [pendingBooking, setPendingBooking] = useState(null)
	const [confirmedBooking, setConfirmedBooking] = useState(null)
	const [notice, setNotice] = useState('')
	const [loginRole, setLoginRole] = useState('customer')
	const [user, setUser] = useState(null)

	useEffect(() => {
		getDestinations().then(setDestinations).catch(() => setDestinations([]))
	}, [])

	const navigate = (nextPage) => {
		setPage(nextPage)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const openBookings = async () => {
		try { setBookings(await getBookings()) } catch { setBookings([]) }
	}

	const navigatePage = (nextPage) => {
		navigate(nextPage)
		if (nextPage === 'bookings') openBookings()
	}

	const openTrip = (destination) => {
		setSelectedTrip(destination)
		navigate('trip')
	}

	const toggleLike = (id) => setLiked((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])

	const startPayment = (booking) => {
		setPendingBooking(booking)
		navigate('payment')
	}

	const submitBooking = async (booking) => {
		try {
			await createBooking(booking)
			setSelectedPackage(null)
			setConfirmedBooking(booking)
			await openBookings()
			setPendingBooking(null)
			setNotice('Your journey has been booked!')
			navigate('confirmation')
			setTimeout(() => setNotice(''), 3200)
		} catch (error) {
			setNotice(error.message)
		}
	}

	const cancel = async (id) => {
		await cancelBooking(id)
		await openBookings()
	}

	const openLogin = (role) => {
		if (role === 'profile') {
			if (user?.role === 'admin') navigate('admin-dashboard')
			return
		}
		setLoginRole(role)
		navigate(role === 'admin' ? 'admin-login' : 'customer-login')
	}

	const handleLogin = (profile) => {
		setUser(profile)
		navigate(profile.role === 'admin' ? 'admin-dashboard' : 'home')
	}

	const logout = () => {
		setUser(null)
		navigate('home')
	}

	return (
		<div className="site-shell">
			{!['payment', 'confirmation', 'login', 'admin', 'customer-login', 'admin-login', 'admin-dashboard'].includes(page) && <Navbar page={page} onNavigate={navigatePage} user={user} onOpenLogin={openLogin}/>} 
			<main>
				{page === 'home' && <Home destinations={destinations} liked={liked} onLike={toggleLike} onBook={openTrip} onNavigate={navigatePage}/>} 
				{page === 'destinations' && <Destinations destinations={destinations} liked={liked} onLike={toggleLike} onBook={openTrip}/>} 
				{page === 'trip' && selectedTrip && <TripDetails destination={selectedTrip} onBack={() => navigate('destinations')} onSubmit={startPayment}/>} 
				{page === 'bookings' && <MyBookings bookings={bookings} onCancel={cancel}/>} 
				{page === 'about' && <About onNavigate={navigatePage}/>} 
				{page === 'help' && <Help onNavigate={navigatePage}/>} 
				{page === 'payment' && selectedTrip && pendingBooking && <Payment destination={selectedTrip} booking={pendingBooking} onCancel={() => navigate('trip')} onConfirm={submitBooking}/>} 
				{page === 'confirmation' && selectedTrip && confirmedBooking && <Confirmation destination={selectedTrip} booking={confirmedBooking} onHome={() => navigate('home')} onBookings={() => navigatePage('bookings')}/>} 
				{page === 'customer-login' && <CustomerLogin onLogin={handleLogin} onAdminLogin={() => openLogin('admin')} onBack={() => navigate('home')}/>} 
				{page === 'admin-login' && <AdminLogin onLogin={handleLogin} onCustomerLogin={() => openLogin('customer')} onBack={() => navigate('home')}/>} 
				{page === 'admin-dashboard' && user?.role === 'admin' && <AdminDashboard name={user.name} bookings={bookings} onLogout={logout} onNavigate={navigatePage}/>} 
			</main>
			{!['trip', 'payment', 'confirmation'].includes(page) && <Footer onNavigate={navigatePage}/>} 
			<BookingModal item={selectedPackage} onClose={() => setSelectedPackage(null)} onSubmit={submitBooking}/>
			{notice && <div className="toast" role="status">{notice}</div>}
			{page !== 'home' && <button className="floating-home" onClick={() => navigate('home')} aria-label="Go to dashboard"><span>⌂</span> Home</button>}
		</div>
	)
}
