import { useState } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
	  <Routes>
			<Route path='/' element={<HomePage />} />
	  </Routes>
  )
}

export default App
