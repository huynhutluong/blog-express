let express = require('express');
let router = express.Router();
let User = require('../models/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let id = req.query.id;
    let s = req.query.s;
    let users = [];

    if (id) {
        users = await User.findById(id);
    }
    // Neu s ton tai tra ve so luong users = s, createAt = lay ra documents moi nhat
    else if (s) {
        users = await User.find().sort({ createdAt: -1 }).limit(s);
    } else {
        users = await User.find();
    }

    res.send(users)

});

module.exports = router;