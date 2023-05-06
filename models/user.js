const mongoose = require("mongoose");
const Comment = require('./comment');

let userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    comments: [{
        type: Comment.schema
    }]
})

module.exports = mongoose.model("User", userSchema)