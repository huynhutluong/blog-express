var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const User = require("../models/user");

/* GET users listing. */
// relatedArticles?article_id=644c59b56667437d02855694&article_topic=Thể+thao
router.get('/', async function (req, res, next) {
    let { article_id } = req.query;
    let relatedArticles = [];
    relatedArticles = await Article.find({ _id: {$ne: article_id} }).sort({created_at: -1}).limit(3);
    res.send(relatedArticles);
});

module.exports = router;