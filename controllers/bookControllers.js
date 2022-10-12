////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Book = require('../models/book')


/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()


/////////////////////////////////////////
// Router Middleware
/////////////////////////////////////////
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})


/////////////////////////////////////////////
// BOOK Routes
////////////////////////////////////////////
// GET request
// index ALL
router.get('/', (req, res) => {
	Book.find({})
		.then(books => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			res.render('books/index', { books, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's books
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Book.find({ owner: userId })
		.then(books => {
			res.render('books/index', { books, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('books/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.read = req.body.read === 'on' ? true : false

	req.body.owner = req.session.userId
	Book.create(req.body)
		.then(books => {
			// console.log('this was returned from create', book)
			res.redirect('/books')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/editBooks/:id/', (req, res) => {
	const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	// we need to get the id
	const bookId = req.params.id
	Book.findById(bookId)
		.then(book => {
			res.render('books/editBooks', { book, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const bookId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Book.findByIdAndUpdate(bookId, req.body, { new: true })
		.then(book => {
			res.redirect(`/books/${book.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const bookId = req.params.id
	Book.findById(bookId)
		.then(book => {
            const {username, loggedIn, userId} = req.session
			res.render('books/show', { book, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const bookId = req.params.id
	Book.findByIdAndRemove(bookId)
		.then(book => {
			res.redirect('/books')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router
