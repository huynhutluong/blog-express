const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let User = require('../models/user')

/* GET home page. */
router.post("/", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;
        const correctedEmail = email.toLowerCase();
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email: correctedEmail });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const tk = jwt.sign(
                { user_id: user._id, email: correctedEmail },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1d",
                }
            );

            // save user token
            user.token = tk;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

module.exports = router;