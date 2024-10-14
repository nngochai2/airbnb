import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
import ListingDetails from './pages/ListingDetails'
import BookingPage from './pages/BookingPage'
import About from './pages/About'
import ConfirmationPage from './pages/ConfirmationPage'
import { BookingProvider } from './contexts/BookingContext.jsx'
import SuccessfulBookingPage from './pages/SuccessfulBooking'

function App() {
	return (
		<BookingProvider>
			<div className="flex flex-col min-h-screen w-full">
			<Navbar />
			<main className="flex-grow w-full pt-14"> {/* pt-14 to account for fixed navbar */}
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path='/about' element={<About />} />
					<Route path='/listing/:id' element={<ListingDetails />} />
					<Route path='/booking/:listingId' element={<BookingPage />} />
					<Route path='/confirm-booking' element={<ConfirmationPage />} />
					<Route path='/booking-success' element={<SuccessfulBookingPage />}></Route>
				</Routes>
			</main>
			<Footer />
			</div>
		</BookingProvider>
	)	
}

export default App