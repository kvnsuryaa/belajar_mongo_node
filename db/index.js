require("dotenv").config();

const mongoose = require("mongoose");

const db = async () => {
    console.log('Start Connection to mongodb')
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connected")
    } catch (err) {
        console.log(err)
    }
}

module.exports = db