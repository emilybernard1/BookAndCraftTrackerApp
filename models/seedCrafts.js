///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Craft =  require('./craft')

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
const db = mongoose.connection


// seed for crafts
db.on('open', () => {
    // bring in the array of starter crafts
    const startCrafts = [
        { name: "Create Your Own Succulent Hanger", materials: "Kit", inHand: true, stored: "In the top of my closet", time: "30 min to 1 hour" },
        { name: "Blanket for Ryleigh", materials: "top fabric, bottom fabric, blanket binding", inHand: true, stored: "the skinny part of my closet", time: "2 hours" },
        { name: "Coloring Book for Vivi", materials: "Book, pencils, eraser, black G2-10 pen", inHand: true, stored: "under my desk", time: "many months" },
        { name: "Blanket for Beth", materials: "top fabric, bottom fabric, blanket binding", inHand: true, stored: "hallway closet near girls rooms", time: "2 hours" },
        { name: "Spell Jar for protection", materials: "jar, cork, crystals, wax, incense, candle", inHand: false, stored: "not yet", time: "30 minutes" },
        { name: "Design blanket with Beth", materials: "Spoonflower Fabric, blanket binding, thread", inHand: false, stored: "not yet", time: "2-4 hours" }
    ]
    // delete all the existing crafts
    Craft.deleteMany({ owner: null })
        .then(deletedCrafts => {
            console.log('this is what .deleteMany returns', deletedCrafts)

            // create a bunch of new crafts from startCrafts
            Craft.create(startCrafts)
                .then(data => {
                    console.log('here are the newly created crafts', data)
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