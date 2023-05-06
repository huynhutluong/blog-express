var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const User = require('../models/user');
const Comment = require('../models/comment')
const {save} = require("debug");

router.get('/', async function (req, res, next) {
    try {
        let comments = []
        const {user_id} = req.body
        if (user_id) {
            comments = await Comment.findById(user_id)
        }
        res.send.status(200).json(comments)
    } catch (error) {
        console.log(error)
    }
})

router.put('/', async function (req, res, next) {
    try {
        const {article_id, user_id, desc} = req.body
        const create_at = Date.now()
        const user = await User.findById(user_id)
        const article = await Article.findById(article_id)
        const fullName = user.first_name + " " + user.last_name

        if (!(user && article)) {
            res.status(400).send("User or Article does not exist");
        }

        if (user && article) {
            var comment = await Comment.create(
                {
                    user: {
                        _id: user._id,
                        full_name: fullName,
                        username: user.username
                    },
                    desc: desc,
                    create_at: create_at
                },
            )

            var commentInArticle = await Article.updateOne(
                {
                    _id: article_id
                },
                {
                    $push: {
                        comments: comment
                    }
                }
            )
        }

        res.status(200).json(article);

    } catch (error) {
        console.log(error)
    }
})

router.patch('/', async function (req, res, next) {
    try {
        const {comment_id, article_id, user_id, desc} = req.body
        const user = await User.findById(user_id)
        const article = await Article.findById(article_id)
        const fullName = user.first_name + " " + user.last_name

        if (!(user && article)) {
            res.status(400).send("User or Article or Comment does not exist");
        }

        if (user && article) {
            var commentInArticle = await Article.updateOne(
                {
                    _id: article_id,
                    'comments._id': comment_id
                },
                {
                    '$set': {
                        'comments.$.desc': desc
                    }
                }
            )
        }

        res.status(200).json(commentInArticle);

    } catch (error) {
        console.log(error)
    }
})

router.delete('/', async function (req, res, next) {
    try {
        const {article_id, comment_id} = req.body
        let article = await Article.findById(article_id)

        if (!article) {
            res.status(400).send("Article or Comment does not exist");
        }

        var commentInArticle = await Article.updateOne(
            {
                _id: article_id
            },
            {
                '$pull': {
                    comments: {
                        _id: comment_id,
                    }
                },
            }
        )
        res.send({message: "Comment deleted"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;