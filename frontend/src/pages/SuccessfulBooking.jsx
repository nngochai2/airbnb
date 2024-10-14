import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const SuccessfulBooking = () => {
	const [booking, setBooking] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const location = useLocation();
	const bookingId = location.state?.bookingId;

	useEffect(() => {
		const fetchBookingDetails = async () => {
			if (!bookingId) {
				setLoading(false);
				setError('Booking ID not found');
				return;
			}
			try {
				console.log('Fetching booking details for ID:', bookingId);
				const response = await axios.get(`http://localhost:3030/api/bookings/${bookingId}`);
				console.log('Booking details response:', response.data);
				setBooking(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching booking details:', error);
				setError('Failed to fetch booking details. Please try again later.');
				setLoading(false);
			}
		};

		fetchBookingDetails();
	}, [bookingId]);

	if (loading) return <LoadingSpinner />;

	if (error) {
		return (
			<div className="max-w-2xl mx-auto p-4 text-center pb-8">
				<h1 className="text-3xl font-bold mb-4">Booking Confirmed</h1>
				<p className="mb-4">Your booking has been successfully confirmed, but we couldn't retrieve the details.</p>
				<p className="text-red-500 mb-4">{error}</p>
				<Link to="/" className="bg-airbnb text-white px-4 py-2 rounded hover:bg-red-700">
					Return to Home
				</Link>
			</div>
		);
	}

	if (!booking) {
		return (
			<div className="max-w-2xl mx-auto p-4 text-center pb-8">
				<h1 className="text-3xl font-bold mb-4">Booking Confirmed</h1>
				<p>Your booking has been successfully confirmed, but we couldn't retrieve the details.</p>
				<Link to="/" className="bg-airbnb text-white px-4 py-2 rounded hover:bg-red-700">
					Return to Home
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6 text-center">Booking Confirmed!</h1>
			<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
				<p className="font-bold">Success</p>
				<p>Your booking has been successfully confirmed. Here are your booking details:</p>
			</div>
			<div className="bg-white shadow-md rounded-lg p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">Booking Details</h2>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div><span className="font-semibold">Check-in:</span> {new Date(booking.start_date).toLocaleDateString()}</div>
					<div><span className="font-semibold">Check-out:</span> {new Date(booking.end_date).toLocaleDateString()}</div>
					<div><span className="font-semibold">Guest:</span> {booking.client_name}</div>
					<div><span className="font-semibold">Email:</span> {booking.email}</div>
				</div>
			</div>
			<div className="text-center pt-2 pb-8">
				<Link to="/" className="bg-airbnb text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300">
					Return to Home
				</Link>
			</div>
		</div>
	);
};

export default SuccessfulBooking;