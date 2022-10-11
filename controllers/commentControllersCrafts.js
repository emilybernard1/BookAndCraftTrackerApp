////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Craft =  require('../models/crafts')

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Craft Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:craftId", (req, res) => {
    const craftId = req.params.craftId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific craft
    Craft.findById(craftId)
        // do something if it works
        //  --> send a success response status and maybe the comment? maybe the craft?
        .then(craft => {
            // push the comment into the craft.comments array
            craft.comments.push(req.body)
            // we need to save the craft
            return craft.save()
        })
        .then(craft => {
            // res.status(200).json({ craft: craft })
            res.redirect(`/crafts/${craft.id}`)
        })
        // do something else if it doesn't work
        //  --> send some kind of error depending on what went wrong
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:craftId/:commId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const craftId = req.params.craftId 
    const commId = req.params.commId
    // get the fruit
    Craft.findById(craftId)
        .then(craft => {
            // get the comment
            const theComment = craft.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    craft.save()
                    res.redirect(`/crafts/${craft.id}`)
                    // return the saved craft
                    // return craft.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

/////////////////////////////////////////////
// CRAFT Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:craftId", (req, res) => {
    const craftId = req.params.craftId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific craft
    Craft.findById(craftId)
        // do something if it works
        .then(craft => {
            // push the comment into the craft.comments array
            craft.comments.push(req.body)
            // we need to save the craft
            return craft.save()
        })
        .then(craft => {
            // res.status(200).json({ craft: craft })
            res.redirect(`/craft/${craft.id}`)
        })
        // do something else if it doesn't work
        //  --> send some kind of error depending on what went wrong
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:craftId/:commId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const craftId = req.params.craftId 
    const commId = req.params.commId
    // get the craft
    Craft.findById(craftId)
        .then(craft => {
            // get the comment
            const theComment = craft.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    craft.save()
                    res.redirect(`/craft/${craft.id}`)
                    // return the saved craft
                    // return craft.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router