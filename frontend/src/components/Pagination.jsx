import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="flex justify-center mt-8 pb-12">
			<ul className="flex space-x-2">
				{pageNumbers.map(number => (
					<li key={number}>
						<button
							onClick={() => onPageChange(number)}
							className={`px-4 py-2 rounded ${currentPage === number
									? 'bg-airbnb text-white'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination
