import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner';
import { useBookingContext } from '../contexts/BookingContext';

const BookingPage = () => {
	const { listingId } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const { bookingData, setBookingData, listingDetails, setListingDetails } = useBookingContext();

	useEffect(() => {
		const fetchListing = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`/api/listings/${listingId}`);
				console.log('Listing details fetched:', response.data);
				setListingDetails(response.data);
				setBookingData(prevData => {
					const newData = {
						...prevData, 
					listing_id: response.data._id
					} 
					console.log('Updated booking data in booking page:', newData);
					return newData;
				})
			} catch (error) {
				console.error('Error fetching listing:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchListing();
	}, [listingId, setListingDetails, setBookingData]);

	const handleChange = (e) => {
		setBookingData({ ...bookingData, [e.target.name]: e.target.value })
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (listingDetails) {
			navigate('/confirm-booking');
		} else {
			console.error('Listing data is not available.')
		}
	};

	if (loading) {
		return <LoadingSpinner />
	}

	if (!listingDetails) {
		return <div className="text-center mt-8">Listing not found</div>;
	}

	return (
		<div className="max-w-2xl mx-auto p-4 pt-10">
			<h1 className="text-3xl font-bold mb-4">Book Your Stay</h1>
			<h2 className="text-2xl mb-4">{listingDetails.name}</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block mb-1">Start Date</label>
						<input
							type="date"
							name="start_date"
							value={bookingData.start_date}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							required
						/>
					</div>
					<div>
						<label className="block mb-1">End Date</label>
						<input
							type="date"
							name="end_date"
							value={bookingData.end_date}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							required
						/>
					</div>
				</div>
				<div>
					<label className="block mb-1">Full Name</label>
					<input
						type="text"
						name="client_name"
						value={bookingData.client_name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block mb-1">Email</label>
					<input
						type="email"
						name="email"
						value={bookingData.email}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block mb-1">Daylight Phone</label>
					<input
						type="tel"
						name="daylightPhone"
						value={bookingData.daylightPhone}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label className="block mb-1">Mobile Phone</label>
					<input
						type="tel"
						name="mobilePhone"
						value={bookingData.mobilePhone}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label className="block mb-1">Postal Address</label>
					<input
						type="text"
						name="postalAddress"
						value={bookingData.postalAddress}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label className="block mb-1">Home Address</label>
					<input
						type="text"
						name="homeAddress"
						value={bookingData.homeAddress}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className='flex gap-3 pb-10'>
					<button
						onClick={() => navigate(-1)}
						type="button"
						className='w-full flex bg-gray-400 text-white py-2 rounded hover:bg-slate-500 transition justify-center duration-300'>
						Cancel
					</button>
					<button type="submit" className="w-full flex bg-red-500 text-white py-2 rounded hover:bg-red-600 transition justify-center duration-300">
						Proceed
					</button>
				</div>
			</form>
		</div>
	)
}

export default BookingPage