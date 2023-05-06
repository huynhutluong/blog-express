require("dotenv").config();
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser1 = await User.findOne({ email });

        if (oldUser1) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(),
            username: email.toLowerCase(),
            password: encryptedPassword,
        });

        // Create token
        let tk = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1d",
            }
        );
        // save user token
        user.token = tk;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


module.exports = router;