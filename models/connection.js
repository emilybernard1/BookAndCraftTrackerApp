/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
// make our .env variables available via process.env
require('dotenv').config()

const mongoose = require('mongoose')

////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// this is where we will set up our inputs for our database connect function
const DATABASE_URL = process.env.DATABASE_URL
// connect to the database
mongoose.connect(process.env.DATABASE_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

// save the connection in a variable
const db = mongoose.connection

// create some notification
mongoose.connection
db.on('open', () => console.log('You are connected to mongo'))
db.on('close', () => console.log('You are disconnected from mongo'))
db.on('error', (error) => console.log(error))

/////////////////////////////////////////////
// Export our connection
/////////////////////////////////////////////
module.exports = mongoose
