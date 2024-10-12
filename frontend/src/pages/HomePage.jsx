import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ListingCard from '../components/ListingCard';
import FilterAndSort from '../components/FilterAndSort';

const HomePage = () => {
	const [listings, setListings] = useState([]);
	const [filteredListings, setFilteredListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:3030/api/listings')
			.then((response) => {
				// Check if response.data is an array, if not, use response.data.data
				const listingsData = Array.isArray(response.data) ? response.data : response.data.data;
				setListings(listingsData || []);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching listings:", error);
				setError(error.message || "An error occurred while fetching listings.");
				setLoading(false);
			})
	}, []);

	const handleSort = (sortOption) => {
		let sorted = [...filteredListings];
		switch (sortOption) {
			case 'price_asc':
				sorted.sort((a, b) => getNumericValue(a.price) - getNumericValue(b.price));
				break;
			case 'price_desc':
				sorted.sort((a, b) => getNumericValue(b.price) - getNumericValue(a.price));
				break;
			case 'rating_desc':
				sorted.sort((a, b) => getNumericValue(b.review_scores?.review_scores_rating) - getNumericValue(a.review_scores?.review_scores_rating));
				break;
			case 'rating_asc':
				sorted.sort((a, b) => getNumericValue(a.review_scores?.review_scores_rating) - getNumericValue(b.review_scores?.review_scores_rating));
				break;
			default:
				break;
		}
		setFilteredListings(sorted);
	};

	const handleFilter = ({ location, propertyType, bedrooms }) => {
		let filtered = listings.filter(listing => {
			return (
				(!location || listing.address.market.toLowerCase().includes(location.toLowerCase())) &&
				(!propertyType || listing.property_type === propertyType) &&
				(!bedrooms || listing.bedrooms === bedrooms)
			);
		});
		setFilteredListings(filtered);
	};

	const getNumericValue = (value) => {
		if (typeof value === 'object' && value.$numberDecimal) {
			return parseFloat(value.$numberDecimal);
		}
		return parseFloat(value) || 0;
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="text-center text-red-500">
				Error: {error}
			</div>
		)
	}

	if (!listings || listings.length === 0) {
		return (
			<div className='text-center'>
				No listings available.
			</div>
		)
	}
	return (
		<div>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Available Listings</h1>
			<FilterAndSort onSortChange={handleSort} onFilterChange={handleFilter} />
			{filteredListings.length === 0 ? (
				<div className='text-center text-lg text-gray-600'>
					No listings available matching your criteria.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredListings.map(listing => (
						<ListingCard key={listing._id} listing={listing} />
					))}
				</div>
			)}
		</div>
	)
}

export default HomePage
