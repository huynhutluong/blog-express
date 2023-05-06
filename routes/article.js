var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const User = require("../models/user");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    let id = req.query.id;
    let q = req.query.q;
    let topic = req.query.topic;
    let page = req.query.page;
    let articles = [];

    if (id) {
        articles = await Article.findById(id);
    } else if (q) {
        articles = await Article.find({ headline: q });
    } else if (topic) {
        articles = await Article.find({ topic: topic });
    } else {
        articles = await Article.find().sort({created_at: -1}).limit(3);
    }

    res.send(articles);
});

router.get('/topic', async function (req, res, next) {
    const { topic, lastArticleId } = req.query;
    let articles = [];
    if (topic && lastArticleId) {
        articles = await Article.find({_id: {$gt: lastArticleId}, topic: topic}).limit(5);
    } else if (topic) {
        articles = await Article.find({topic: topic}).limit(5);
    }

    return res.send(articles);
});

router.post('/', async function (req, res, next) {
    //   headline:Byline:lead:body:tail:topic:keyword:create_at:

    try {
        const {headline, byline, lead, body, tail, topic, keyword, image} = req.body;
        const create_at = Date.now();
        const comments = [];
        // Validate input
        if (!(headline && byline && lead && body && topic && keyword)) {
            res.status(400).send("All input is required");
        }

        // Create an article
        const article = await Article.create({
            headline,
            byline,
            lead,
            body,
            tail,
            topic,
            keyword,
            image,
            create_at,
            comments
        });
        // Return data
        res.status(201).json(article);

    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', function (req, res, next) {
    res.send({message: "Get a Woof woof with THIS id"});
});

router.put('/:id', function (req, res, next) {
    res.send({message: "Put a Woof woof with THIS id"});
});

router.delete('/:id', function (req, res, next) {
    res.send({message: "Delete a Woof woof with THIS id"});
});


module.exports = router;
