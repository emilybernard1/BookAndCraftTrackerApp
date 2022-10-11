///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Book = require('./bookModel')

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
// This script will be run, with the command in the terminal `npm run seed`
const db = mongoose.connection

// seed for books
db.on('open', () => {
    // bring in the array of starter books
    const startBooks = [
        { title: "La Fille qui lisait dans le métro", author: "Christine Féret-Fleury", genre: "French Literature", pages: 170, read: false },
        { title: "The Mystwick School of Music Craft", author: "Jessica Khoury", genre: "Young Adult Fantasy", pages: 357,  read: false },
        { title: "An Island Wedding", author: "Jenny Colgan", genre: "Chick Lit", pages: 386, read: false },
        { title: "Hocus Pocus 2", author: "FreeForm Books", genre: "Fantasy", pages: 318, read: true },
        { title: "The Little Shop of Found Things", author: "Paula Brackston", genre: "Chick Lit", pages: 307, read: false }, 
        { title: "Resistance is Futile", author: "Jenny T. Colgan", genre: "Chick Lit", pages: 340, read: false }
        { title: "Hail Mary", author: "Andy Weir", genre: "Science Fiction", pages: 476, read: false }
        { title: "Artemis", author: "Andy Weir", genre: "Science Fiction", pages: 305, read: false }
        { title: "Les Petites Pensionnaires", author: "Hilary McKay", genre: "French Literature", pages: 347, read: false }
        { title: "The Ickabog", author: "JK Rowling", genre: "YA Fantasy", pages: 274, read: false }
  ]

    // delete all the existing books
    Book.deleteMany({ owner: null })
        .then(deletedBooks => {
            console.log('this is what .deleteMany returns', deletedBooks)

            // create a bunch of new fruits from startFruits
            Book.create(startBooks)
                .then(data => {
                    console.log('here are the newly created books', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})

