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
		.populate("comments.author", "username")
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
    // find the books, by ownership
    Book.find({ owner: req.session.userId })
    // then display the books
        .then(books => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            res.render('books/index', { books, username, loggedIn, userId })
        })
    // or throw an error if there is one
        .catch(err => res.redirect(`/error?error=${err}`))
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, loggedIn, userId } = req.session
	res.render('books/new', { username, loggedIn, userId })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.read = req.body.read === 'on' ? true : false
	
	req.body.owner = req.session.userId
	console.log('the book from the form', req.body)
	Book.create(req.body)
		.then(books => {
			const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
			// console.log('this was returned from create', book)
			res.redirect('/books')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// edit route -> GET that takes us to the edit form view
router.get('/edit/:id', (req, res) => {
	const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	// we need to get the id
	const bookId = req.params.id
	Book.findById(bookId)
		.then(book => {
			res.render('books/edit', { book, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// PUT request
// update route -> updates a specific book
router.put("/:id", (req, res) => {
    console.log("req.body initially", req.body)
    const id = req.params.id

    req.body.read = req.body.read === 'on' ? true : false
    console.log('req.body after changing checkbox value', req.body)
    Book.findById(id)
        .then(book => {
            if (book.owner == req.session.userId) {
                // must return the results of this query
                return book.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            // console.log('returned from update promise', data)
            res.redirect(`/books/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// show route
router.get('/:id', (req, res) => {
	const id = req.params.id
	Book.findById(id)
		.populate("comments.author", "username")
		.then(book => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // res.json({ book: book })
            res.render('books/show', { book, username, loggedIn, userId })
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
