import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner';

const BookingPage = () => {
	const { listingId } = useParams();
	const navigate = useNavigate();
	const [listing, setListing] = useState(null);
	const [formData, setFormData] = useState({
		start_date: '',
		end_date: '',
		client_name: '',
		email: '',
		daylightPhone: '',
		mobilePhone: '',
		postalAddress: '',
		homeAddress: ''
	})

	useEffect(() => {
		const fetchListing = async () => {
			try {
				const response = await axios.get(`http://localhost:3030/api/listings/${listingId}`);
				setListing(response.data);
			} catch (error) {
				console.error('Error fetching listing:', error);
			};
		};

		fetchListing();
	}, [listingId]);

	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value })
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('/confirm-booking', { state: { bookingData: formData, listingDetails: listing } });
	};

	if (!listing) {
		return <LoadingSpinner />
	}

	return (
		<div className="max-w-2xl mx-auto p-4 pt-10">
			<h1 className="text-3xl font-bold mb-4">Book Your Stay</h1>
			<h2 className="text-2xl mb-4">{listing.name}</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block mb-1">Start Date</label>
						<input
							type="date"
							name="start_date"
							value={formData.start_date}
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
							value={formData.end_date}
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
						value={formData.client_name}
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
						value={formData.email}
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
						value={formData.daylightPhone}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label className="block mb-1">Mobile Phone</label>
					<input
						type="tel"
						name="mobilePhone"
						value={formData.mobilePhone}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label className="block mb-1">Postal Address</label>
					<input
						type="text"
						name="postalAddress"
						value={formData.postalAddress}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label className="block mb-1">Home Address</label>
					<input
						type="text"
						name="homeAddress"
						value={formData.homeAddress}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className='flex gap-3 pb-10'>
					<button 
						onClick={() => navigate(-1)}
						className='w-full flex bg-gray-400 text-white py-2 rounded hover:bg-slate-500 transition justify-center duration-300'>
							Cancel
					</button>
					<button type="submit" className="w-full flex bg-red-500 text-white py-2 rounded hover:bg-red-600 transition justify-center duration-300">
						Confirm Booking
					</button>
				</div>
				
			</form>
		</div>
	)
}

export default BookingPage
