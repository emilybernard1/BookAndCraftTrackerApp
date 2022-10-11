///////////////////////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////////////////////
const mongoose = require('./connection')

// we're going to pull the Schema and model from mongoose
// we'll use a syntax called "destructuring"
const { Schema } = mongoose

// comment schema
const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

//////////////////////////////////////////////////
// Export our schema
//////////////////////////////////////////////////
module.exports = commentSchema
// because we're NOT making a model here, we're making a subdocument