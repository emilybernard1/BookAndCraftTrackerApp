////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Craft =  require('../models/craft')

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Craft Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
// Nit: choose either double or single quotes
router.post("/:craftId", (req, res) => {
    // Nit: remove console.log
    console.log("the route is being hit")
    const craftId = req.params.craftId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific craft
    Craft.findById(craftId)
        .then(craft => {
            // push the comment into the craft.comments array
            craft.comments.push(req.body)
            // we need to save the craft
            return craft.save()
        })
        .then(craft => {
            res.redirect(`/crafts/${craft.id}`)
        })
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
            // Nit: remove console.log
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    craft.save()
                    res.redirect(`/crafts/${craft.id}`)
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