import React from 'react'
import { Link } from 'react-router-dom'

const ListingCard = ({ listing }) => {
	if (!listing) {
		return null;
	}

	// Helper function to safely get the price
	const getNumericValue = (value) => {
		if (typeof value === 'object' && value.$numberDecimal) {
			return parseFloat(value.$numberDecimal);
		}
		return parseFloat(value);
	};

	const price = getNumericValue(listing.price).toFixed(2);
	const rating = listing.review_scores && listing.review_scores.review_scores_rating
		? getNumericValue(listing.review_scores.review_scores_rating).toFixed(1)
		: 'N/A';

  	return (
		<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
			<div className="p-6">
				<h2 className="text-xl font-bold text-gray-800 mb-2">{listing.name}</h2>
				<p className="text-gray-600 text-sm mb-4 line-clamp-3">{listing.summary}</p>
				<div className="flex justify-between items-center mb-4">
					<span className="text-lg font-semibold text-blue-600">${price} <span className="text-sm text-gray-500">/ night</span></span>
					<span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
						Rating: {rating}/100
					</span>
				</div>
				<Link
					to={`/listing/${listing._id}`}
					className="block w-full text-center bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
				>
					View Details
				</Link>
			</div>
		</div>
  	)
}

export default ListingCard
