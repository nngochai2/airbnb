import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ExpandableSearch = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
		>
			<div className={`flex items-center justify-end bg-gray-100 rounded-full overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-10'}`}>
				<input
					type="text"
					placeholder="Search ..."
					className={`bg-transparent outline-none px-3 py-2 w-full ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible w-0'} transition-all duration-300`}
				/>
				<button className="p-2 focus:outline-ascend-blue">
					<Search className="w-6 h-6 text-ascend-blue" />
				</button>
			</div>
		</div>
	);
};

export default ExpandableSearch;