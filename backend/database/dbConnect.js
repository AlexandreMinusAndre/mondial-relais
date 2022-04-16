const mongoose = require("mongoose");


module.exports = async () => {

    const url = process.env.urlDB

    try {
    await mongoose.connect(url);
    console.log("Connected to database.")
    } catch (err) {
        console.log(err);
    }
    
}