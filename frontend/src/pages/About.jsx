import React, { useEffect, useState } from 'react';
import ProfilePicture from '../assets/profile_pic.jpg'

const AboutPage = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, [])

	return (
		<div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className={`bg-white shadow-xl rounded-lg overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
					<div className="md:flex">
						<div className="md:flex-shrink-0">
							<img
								className={`h-48 w-full object-cover md:w-48 rounded-full m-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
								src={ProfilePicture}
								alt="Profile"
							/>
						</div>
						<div className="p-8">
							<div className={`uppercase tracking-wide text-sm text-airbnb font-semibold transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>About Us</div>
							<h1 className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
								Nguyen Ngoc Hai
							</h1>
							<p className={`mt-2 text-xl text-gray-500 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Founder & CEO</p>
							<p className={`mt-4 max-w-2xl text-xl text-gray-500 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
								Welcome to our unique accommodation booking platform. We're passionate about connecting travelers with extraordinary stays and experiences around the world.
							</p>
						</div>
					</div>
					<div className={`px-8 py-6 bg-gray-50 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
						<h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
						<p className="text-gray-600">
							Our mission is to revolutionize the way people travel by offering unique, comfortable, and memorable accommodations. We believe that where you stay is just as important as where you go, and we're dedicated to making every trip special.
						</p>
					</div>
					<div className={`px-8 py-6 transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
						<h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
						<ul className="list-disc list-inside text-gray-600 space-y-2">
							<li>Curated selection of unique properties</li>
							<li>24/7 customer support</li>
							<li>Verified guest reviews</li>
							<li>Secure booking process</li>
							<li>Best price guarantee</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;