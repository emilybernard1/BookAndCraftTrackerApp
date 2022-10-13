////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Book = require("../models/book")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// BOOK Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:bookId", (req, res) => {
    const bookId = req.params.bookId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific book
    Book.findById(bookId)
        .then(book => {
            // push the comment into the book.comments array
            book.comments.push(req.body)
            // we need to save the book
            return book.save()
        })
        .then(book => {
            // res.status(200).json({ book: book })
            res.redirect(`/books/${book.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:bookId/:commId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const bookId = req.params.bookId 
    const commId = req.params.commId
    // get the fruit
    Book.findById(bookId)
        .then(book => {
            // get the comment
            // subdocs have a built in method that you can use to access specific subdocuments when you need to.
            // this built in method is called .id()
            const theComment = book.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    book.save()
                    res.redirect(`/books/${book.id}`)
                    // return the saved book
                    // return book.save()
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