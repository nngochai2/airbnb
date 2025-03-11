import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBookingContext } from '../contexts/BookingContext';

const ConfirmationPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const { bookingData, setBookingData, listingDetails, setListingDetails } = useBookingContext();

	useEffect(() => {
		if (location.state?.bookingData) {
			setBookingData(location.state.bookingData);
		}

		if (location.state?.listingDetails) {
			setListingDetails(location.state.listingDetails);
		}

		if (!bookingData || !listingDetails) {
			setError('Booking information is incomplete. Please try again.');
		}
	}, [location.state, setBookingData, setListingDetails]);

	const handleConfirmBooking = async () => {
		console.log('Booking data in confirmation page:', bookingData);
		console.log('Listing details in confirmation page:', listingDetails)

		if (!bookingData || !listingDetails) {
			setError('Cannot proceed with booking due to missing information.');
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const bookingPayload = {
				...bookingData
			};

			console.log('Sending booking data:', bookingPayload); // For debugging

			const response = await axios.post('/api/bookings', bookingPayload);
			setLoading(false);
			navigate('/booking-success', { state: { bookingId: response.data._id } });
		} catch (err) {
			setLoading(false);
			console.error('Booking confirmation error:', err);
			setError(err.response?.data?.message || 'Failed to confirm booking. Please try again.');
		}
	};

	if (!bookingData || !listingDetails) {
		return (
			<div className="max-w-2xl mx-auto p-4">
				<h1 className="text-3xl font-bold mb-6">Error</h1>
				<p className="text-red-500">{error || "Missing booking information. Please try again."}</p>
				<button
					onClick={() => navigate(-1)}
					className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
				>
					Go Back
				</button>
			</div>
		);
	}

	const totalNights = calculateNights(bookingData.start_date, bookingData.end_date);
	const totalPrice = (listingDetails.price * totalNights).toFixed(2);

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Confirm Your Booking</h1>
			<div className="bg-white shadow-md rounded-lg p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">{listingDetails.name}</h2>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div><span className="font-semibold">Check-in:</span> {bookingData.start_date}</div>
					<div><span className="font-semibold">Check-out:</span> {bookingData.end_date}</div>
					<div><span className="font-semibold">Guest:</span> {bookingData.client_name}</div>
					<div><span className="font-semibold">Email:</span> {bookingData.email}</div>
					<div><span className="font-semibold">Nights:</span> {totalNights}</div>
					<div><span className="font-semibold">Price per night:</span> ${listingDetails.price}</div>
				</div>
				<div className="text-lg font-semibold mb-4">
					Total: ${totalPrice}
				</div>
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

const calculateNights = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = Math.abs(end - start);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
};

export default ConfirmationPage;