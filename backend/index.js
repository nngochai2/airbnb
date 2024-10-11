import express from 'express'
import { PORT } from './config.js';

const app = express();

// Middlewarer for passing request body
app.use(express.json())

// Middleware for handling CORS policy
// app.use(cors())

app.listen(PORT, () => {
	console.log(`App is listening to port: ${PORT}`);
})