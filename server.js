////////////////////
//  Dependencies  //
////////////////////
// Nit: Pick either double quotes or single quotes
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const BookRouter = require('./controllers/bookControllers')
const CraftRouter = require('./controllers/craftControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouterBooks = require('./controllers/commentControllersBooks')
const CommentRouterCrafts = require('./controllers/commentControllersCrafts')
// Nit: Remove not used in file
const User = require("./models/user")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

/////////////////////////////////////////////
// Home Route
/////////////////////////////////////////////
app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
    res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/landingPage', (req, res) => {
    const { username, userId, loggedIn } = req.session
    res.render('landing/landingPage', { loggedIn, username, userId })
})

////////////////////
//   Register our Routes //
////////////////////

app.use('/auth', UserRouter)
app.use('/books', BookRouter)
app.use('/crafts', CraftRouter)
app.use('/commentBooks', CommentRouterBooks)
app.use('/commentCrafts', CommentRouterCrafts)
app.use('/users', UserRouter)

// this renders an error page, gets the error from a url request query
app.get('/error', (req, res) => {
    // get session variables
    const { username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist'
    res.render('error.liquid', { error, username, loggedIn, userId })
})

// this is a catchall route, that will redirect to the error page for anything that doesn't satisfy a controller
app.all('*', (req, res) => {
    res.redirect('/error')
})

//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

// END