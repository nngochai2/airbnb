import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import FilterAndSort from '../components/FilterAndSort';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const HomePage = () => {
	const [listings, setListings] = useState([]);
	const [filteredListings, setFilteredListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [listingsPerPage] = useState(9);

	useEffect(() => {
		setLoading(true);
		axios.get('http://localhost:3030/api/listings')
			.then((response) => {
				const listingsData = Array.isArray(response.data) ? response.data : response.data.data;
				setListings(listingsData || []);
				setFilteredListings(listingsData || []);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching listings:", error);
				setError(error.message || "An error occurred while fetching listings");
				setLoading(false);
			});
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
		setCurrentPage(1); // Reset to first page after sorting
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
		setCurrentPage(1); // Reset to first page after filtering
	};

	const getNumericValue = (value) => {
		if (typeof value === 'object' && value.$numberDecimal) {
			return parseFloat(value.$numberDecimal);
		}
		return parseFloat(value) || 0;
	};

	// Get current listings
	const indexOfLastListing = currentPage * listingsPerPage;
	const indexOfFirstListing = indexOfLastListing - listingsPerPage;
	const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

	return (
		<div>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Available Listings</h1>
			<FilterAndSort onSortChange={handleSort} onFilterChange={handleFilter} />
			{filteredListings.length === 0 ? (
				<div className='text-center text-lg text-gray-600'>
					No listings available matching your criteria.
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{currentListings.map(listing => (
							<ListingCard key={listing._id} listing={listing} />
						))}
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={Math.ceil(filteredListings.length / listingsPerPage)}
						onPageChange={paginate}
					/>
				</>
			)}
			<Footer />
		</div>
	)
}

export default HomePage;