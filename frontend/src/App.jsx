import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'

function App() {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<Navbar />
			<main className="flex-grow w-full pt-14"> {/* pt-14 to account for fixed navbar */}
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App