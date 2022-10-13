////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const BookRouter = require('./controllers/bookControllers')
const CraftRouter =  require('./controllers/craftControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouterBooks = require('./controllers/commentControllersBooks')
const CommentRouterCrafts = require('./controllers/commentControllersCrafts')
const User = require("./models/user")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/books', BookRouter)
app.use('/crafts', CraftRouter)
app.use('/commentControllersBooks', CommentRouterBooks)
app.use('/commentControllersCrafts', CommentRouterCrafts)
app.use('/users', UserRouter)


app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

// app.get('/error', (req, res) => {
// 	const error = req.query.error || 'This Page Does Not Exist'
//     const { username, loggedIn, userId } = req.session
// 	res.render('error.liquid', { error, username, loggedIn, userId })
// })

// // if page is not found, send to error page
// app.all('*', (req, res) => {
// 	res.redirect('/error')
// })



//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

// END