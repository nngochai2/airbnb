import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const SuccessfulBookingPage = () => {
	const [booking, setBooking] = useState(null);
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const bookingId = location.state?.bookingId;

	useEffect(() => {
		const fetchBookingDetails = async () => {
			if (!bookingId) {
				setLoading(false);
				return;
			}
			try {
				const response = await axios.get(`http://localhost:3030/api/bookings/${bookingId}`);
				setBooking(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching booking details:', error);
				setLoading(false);
			}
		};

		fetchBookingDetails();
	}, [bookingId]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!booking) {
		return (
			<div className="max-w-2xl mx-auto p-4 text-center">
				<h1 className="text-3xl font-bold mb-4">Booking Confirmed</h1>
				<p>Your booking has been successfully confirmed, but we couldn't retrieve the details.</p>
				<Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
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
				<h2 className="text-xl font-semibold mb-4">{booking.listing.name}</h2>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<span className="font-semibold">Check-in:</span> {new Date(booking.start_date).toLocaleDateString()}
					</div>
					<div>
						<span className="font-semibold">Check-out:</span> {new Date(booking.end_date).toLocaleDateString()}
					</div>
					<div>
						<span className="font-semibold">Guest:</span> {booking.client_name}
					</div>
					<div>
						<span className="font-semibold">Email:</span> {booking.email}
					</div>
				</div>
				<div className="text-lg font-semibold mb-4">
					Total: ${booking.total_price.toFixed(2)}
				</div>
			</div>
			<div className="text-center">
				<Link to="/" className="bg-airbnb text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300">
					Return to Home
				</Link>
			</div>
		</div>
	);
};

export default SuccessfulBookingPage;