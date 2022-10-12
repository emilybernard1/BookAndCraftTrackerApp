////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
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
// CRAFT Routes
////////////////////////////////////////////
// GET request
// index ALL
router.get('/', (req, res) => {
	Craft.find({})
        .populate("comments.author", "username")
		.then(crafts => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			res.render('crafts/index', { crafts, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
    const { username, userId, loggedIn } = req.session
    res.render('crafts/new', { username, loggedIn })
})

// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Craft.find({ owner: userId })
		.then(crafts => {
			res.render('crafts/index', { crafts, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.inHand = req.body.inHand === 'on' ? true : false

	req.body.owner = req.session.userId
	Craft.create(req.body)
		.then(crafts => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
			// console.log('this was returned from create', craft)
			res.redirect('/crafts')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/crafts/edit/:id', (req, res) => {
	// we need to get the id
	const craftId = req.params.id
	Craft.findById(craftId)
		.then(craft => {
			res.render('crafts/edit/', { craft, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
    console.log("req.body initially", req.body)
	const craftId = req.params.id
	req.body.inHand = req.body.inHand === 'on' ? true : false
    console.log('req.body after changing checkbox value', req.body)
	Craft.findByIdAndUpdate(craftId, req.body, { new: true })
		.then(craft => {
            if (craft.owner == req.session.userId) {
                // must return the results of this query
                return craft.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            // console.log('returned from update promise', data)
            res.redirect(`/crafts/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// show route
router.get('/:id', (req, res) => {
	const craftId = req.params.id
	Craft.findById(craftId)
        .populate("comments.author", "username")
		.then(craft => {
            const {username, loggedIn, userId} = req.session
			res.render('crafts/show', { craft, username, loggedIn, userId })
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
			res.redirect('/crafts')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})



//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router