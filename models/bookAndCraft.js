///////////////////////////////////////////////////////////
// Our schema and model for the book resource
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Import our dependencies
///////////////////////////////////////////////////////////
const mongoose = require('./connection')

///////////////////////////////////////////////////////////
// Import user model for populate
///////////////////////////////////////////////////////////
const User = require('./user')

///////////////////////////////////////////////////////////
// Destructure the schema and model constructors from mongoose
///////////////////////////////////////////////////////////
const { Schema, model } = mongoose

///////////////////////////////////////////////////////////
// Our schema and model for the book resource
///////////////////////////////////////////////////////////
const bookSchema = new Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
        genre: { type: Number, required: true },
		page: { type: Number, required: true },
		read: { type: Boolean, required: false },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Book = model('Book', bookSchema)

///////////////////////////////////////////////////////////
// Our schema and model for the craft resource
///////////////////////////////////////////////////////////
const craftSchema = new Schema(
	{
		name: { type: String, required: true },
		materials: { type: String, required: true },
        inHand: { type: Boolean, required: false },
		stored: { type: String, required: true },
		time: { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Craft = model('Craft', craftSchema)

/////////////////////////////////
// Export our Models
/////////////////////////////////
module.exports = Book
module.exports = Craft
// IS IT OK TO DO IT LIKE THIS????