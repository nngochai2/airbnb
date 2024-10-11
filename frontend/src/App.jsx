import { useState } from 'react'
import { Router, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import BookingForm from './components/bookingForm'
import ListingDetails from './components/ListingDetails'
import './App.css'

function App() {
  return (
	  <Router>
		  <div className="container mx-auto p-4">
			  <h1 className="text-3xl text-fuchsia-900 font-bold mb-4">Airbnb Clone</h1>
			  <Routes>
				  <Route path="/" element={<HomePage />} />
				  <Route path="/listing/:id" element={<ListingDetails />} />
				  <Route path="/booking/:listingId" element={<BookingForm />} />
			  </Routes>
		  </div>
	  </Router>
  )
}

export default App
