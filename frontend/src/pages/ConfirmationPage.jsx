import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const ConfirmationPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const { bookingData, listingDetails } = location.state || {};

	useEffect(() => {
		if (!bookingData || !listingDetails) {
			navigate('/');
		}
	}, [bookingData, listingDetails, navigate]);

	const handleConfirmBooking = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.post('http://localhost:3030/api/bookings', {
				...bookingData,
				listing_id: listingDetails._id
			});
			setLoading(false);
			navigate('/booking-success', { state: { bookingId: response.data._id } });
		} catch (err) {
			setLoading(false);
			if (err.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				setError(err.response.data.message || 'Failed to confirm booking. Please try again.');
			} else if (err.request) {
				// The request was made but no response was received
				setError('No response from server. Please check your internet connection and try again.');
			} else {
				// Something happened in setting up the request that triggered an Error
				setError('An unexpected error occurred. Please try again.');
			}
			console.error('Booking confirmation error:', err);
		}
	};

	if (!bookingData || !listingDetails) {
		return null; // This will prevent any rendering while redirecting
	}

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Confirm Your Booking</h1>
			<div className="bg-white shadow-md rounded-lg p-6 mb-6">
				{/* Booking details */}
				{/* ... (same as before) ... */}
			</div>
			{error && (
				<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
					<p className="font-bold">Error</p>
					<p>{error}</p>
				</div>
			)}
			<div className="flex justify-between">
				<button
					onClick={() => navigate(-1)}
					className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition duration-300"
				>
					Back
				</button>
				<button
					onClick={handleConfirmBooking}
					disabled={loading}
					className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300 disabled:bg-red-300"
				>
					{loading ? 'Confirming...' : 'Confirm Booking'}
				</button>
			</div>
			{loading && <LoadingSpinner />}
		</div>
	);
};

export default ConfirmationPage;