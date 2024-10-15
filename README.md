# Clone AirBnB Web Application 
## Author: Nguyen Ngoc Hai

## Overview
This project is a web-based application that emulates core functionalities of Airbnb, allowing users to browse, filter, and book accommodations. It's built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and incorporates various features to enhance user experience.

## Features
- Listing display with pagination
- Filtering and Sorting options for listings
- Detailed view of individual listings
- Booking functionality
- Responsive design for various screen sizes
- Animated components for enhanced user interface

## Tech Stack
- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express.js
- Database: MongoDB
- Additional libraries: Axios for HTTP requests, React Router for navigation

## Prerequisites
- Node.js (v14 or later)
- MongoDB
- npm or yarn package manager

## Installation and Setup

1. Clone the repository:
   ```
   git clone [your-repository-url]
   cd [your-project-name]
   ```

2. Install dependencies:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3030
   ```

4. Populate the database:
   Run the following scripts to populate your MongoDB database with sample data:
   ```
   cd backend/scripts
   node populateListings.js
   node populateBookings.js
   ```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Project Structure
```
project-root/
├── backend/
│   ├── routes/
│   ├── scripts/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Key Components
- HomePage: Displays listings with filtering and sorting options
- ListingDetails: Shows detailed information about a specific listing
- BookingPage: Handles the booking process
- ConfirmationPage: Displays booking confirmation
- FilterAndSort: Component for filtering and sorting listings

## Additional Notes
- The application uses a custom BookingContext for state management across components.
- Tailwind CSS is used for styling, with custom animations defined in `tailwind.config.js`.
- The backend uses MongoDB for data storage and retrieval.

## Future Enhancements
- User authentication and profile management
- Payment integration
- Review and rating system for listings
- Host dashboard for managing listings

