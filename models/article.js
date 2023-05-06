const mongoose = require("mongoose");
const Comment = require("./comment");

let articleSchema = new mongoose.Schema({
    headline: {
        type: String,
        default: null
    },
    // Byline: Tac gia
    byline: {
        type: String,
        default: null
    },
    // Doan gioi thieu noi dung o dau
    lead: {
        type: String,
        default: null
    },
    // Noi dung chinh
    body: {
        type: String,
        default: null
    },
    // Phan phu o cuoi (Khong can thiet)
    tail: {
        type: String,
        default: null
    },
    // Chu de, danh muc
    topic: {
        type: String
    },
    // Tu khoa de tim cac bai viet tuong tu
    keyword: {
        type: Array
    },
    // Ngay tao
    create_at: {
        type: Date
    },
    image: {
        type: String
    },
    comments: [{
        type: Comment.schema
    }]
})



module.exports = mongoose.model("Article", articleSchema)