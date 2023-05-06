require("dotenv").config();
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const auth = require("../middleware/auth");

router.post("/", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

module.exports = router;