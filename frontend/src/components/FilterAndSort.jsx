import React, { useState } from 'react';

const FilterAndSort = ({ onSortChange, onFilterChange }) => {
	const [isSearchForm, setIsSearchForm] = useState(false);
	const [location, setLocation] = useState('');
	const [propertyType, setPropertyType] = useState('');
	const [bedrooms, setBedrooms] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onFilterChange({ location, propertyType, bedrooms: bedrooms ? parseInt(bedrooms) : '' });
	};

	return (
		<div className="mb-6 bg-white p-4 rounded-lg shadow w-full">
			<div className="flex justify-between items-center mb-4 w-full">
				<h2 className="text-xl font-semibold text-gray-800">Filter & Sort</h2>
				<button
					onClick={() => setIsSearchForm(!isSearchForm)}
					className="bg-airbnb text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
				>
					{isSearchForm ? 'Switch to Sort' : 'Switch to Search'}
				</button>
			</div>

			{isSearchForm ? (
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="location" className="block text-sm font-medium text-gray-700 pb-2">Location</label>
						<input
							type="text"
							id="location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							className="mt-1 pl-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring focus:ring-red-400 focus:ring-opacity-50"
							placeholder="Enter location"
						/>
					</div>
					<div>
						<label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 pb-2">Property Type</label>
						<select
							id="propertyType"
							value={propertyType}
							onChange={(e) => setPropertyType(e.target.value)}
							className="mt-1 pl-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring focus:ring-red-400 focus:ring-opacity-50 tex-"
						>
							<option value="">Select property type</option>
							<option value="Apartment">Apartment</option>
							<option value="House">House</option>
							<option value="Unique space">Unique space</option>
						</select>
					</div>
					<div>
						<label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 pb-2">Number of Bedrooms</label>
						<input
							type="number"
							id="bedrooms"
							value={bedrooms}
							onChange={(e) => setBedrooms(e.target.value)}
							className="mt-1 pl-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							placeholder="Enter number of bedrooms"
							min="1"
						/>
					</div>
					<button type="submit" className="w-full bg-airbnb text-white px-4 py-2 rounded hover:bg-red-700transition duration-300">
						Search
					</button>
				</form>
			) : (
				<div>
					<label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
						Sort by:
					</label>
					<select
						id="sort"
						onChange={(e) => onSortChange(e.target.value)}
						className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="">Default</option>
						<option value="price_asc">Price: Low to High</option>
						<option value="price_desc">Price: High to Low</option>
						<option value="rating_desc">Rating: High to Low</option>
						<option value="rating_asc">Rating: Low to High</option>
					</select>
				</div>
			)}
		</div>
	);
};

export default FilterAndSort;