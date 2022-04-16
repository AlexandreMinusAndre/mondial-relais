const mongoose = require("mongoose");

const schema = new mongoose.Schema({
     mail:{
         type : String,
         minLength: 3,
         maxLength: 30,
         required: true,
         unique: true
     },
     password: {
        type : String,
         minLength: 7,
         maxLength: 1000,
         required: true
     }

    });

const user = mongoose.model('user', schema);

module.exports = user;