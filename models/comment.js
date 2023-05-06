const mongoose = require("mongoose");
const User = require("./user")

let commentSchema = new mongoose.Schema({
    user: User,
    desc: {
      type: String
    },
    create_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Comment", commentSchema)