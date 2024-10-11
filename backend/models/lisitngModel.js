import mongoose from "mongoose";

const lisitngSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		dailyPrice: {
			type: Number,
			required: true,
			min: 0,
		},
		reviewScore: {
			type: Number,
			required: true,
			min: 0
		}
	}
)

export const Listing = mongoose.model('Lisitng', lisitngSchema)
