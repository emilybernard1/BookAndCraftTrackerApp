////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Book = require('../models/book')
const Craft =  require('../models/craft')

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
			
			res.render('book/index', { books, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Book.find({ owner: userId })
		.then(books => {
			res.render('book/index', { books, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('book/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Book.create(req.body)
		.then(book => {
			console.log('this was returned from create', book)
			res.redirect('/book')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const bookId = req.params.id
	Book.findById(bookId)
		.then(book => {
			res.render('book/edit', { book })
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
			res.redirect(`/book/${book.id}`)
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
			res.render('book/show', { book, username, loggedIn, userId })
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
			res.redirect('/book')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


/////////////////////////////////////////////
// CRAFT Routes
////////////////////////////////////////////
// GET request
// index ALL
router.get('/', (req, res) => {
	Craft.find({})
		.then(crafts => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('craft/index', { crafts, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Craft.find({ owner: userId })
		.then(crafts => {
			res.render('craft/index', { crafts, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('craft/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Craft.create(req.body)
		.then(craft => {
			console.log('this was returned from create', craft)
			res.redirect('/craft')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const craftId = req.params.id
	Craft.findById(craftId)
		.then(craft => {
			res.render('craft/edit', { craft })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const craftId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Craft.findByIdAndUpdate(craftId, req.body, { new: true })
		.then(craft => {
			res.redirect(`/craft/${craft.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const craftId = req.params.id
	Craft.findById(craftId)
		.then(craft => {
            const {username, loggedIn, userId} = req.session
			res.render('craft/show', { craft, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const craftId = req.params.id
	Craft.findByIdAndRemove(craftId)
		.then(craft => {
			res.redirect('/craft')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})



//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router
