const mongoose = require("mongoose");

const Book = mongoose.Schema({
    title: {
        type: String,
        default: 'No Title',
    },
    description: {
        type: String,
        default: 'No Description',
    }
})

module.exports = mongoose.model('Book', Book)