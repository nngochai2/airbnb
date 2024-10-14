import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBookingContext = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
	const [bookingData, setBookingData] = useState({
		listing_id: '',
		start_date: '',
		end_date: '',
		client_name: '',
		email: '',
		daylightPhone: '',
		mobilePhone: '',
		postalAddress: '',
		homeAddress: ''
	});
	const [listingDetails, setListingDetails] = useState(null);

	return (
		<BookingContext.Provider value={{ bookingData, setBookingData, listingDetails, setListingDetails }}>
			{children}
		</BookingContext.Provider>
	)
}