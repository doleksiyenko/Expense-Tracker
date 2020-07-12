const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");
const validateUserDetails = require("../validation");

router.post("/register", async (req, res) => {
    // check if the same username already exists in the database, if it does, reject the registration
    const userExists = await User.findOne({
        displayName: req.body.displayName,
    });
    if (userExists)
        return res
            .status(400)
            .json({ error: "A user with this username already exists!" });
    // validate
    const validation = validateUserDetails.validate({
        displayName: req.body.displayName.trim(),
        password: req.body.password.trim(),
    });
    if (validation.error) {
        res.status(400).json({ error: validation.error.details[0].message });
    } else {
        // encrypt the password
        const hash = bcrypt.hashSync(req.body.password, 10);
        // the validation succeeded, so create the new user
        const newUser = new User({
            displayName: req.body.displayName.trim(),
            password: hash,
        });
        // try saving the user to the database
        try {
            let saveUser = await newUser.save();
            // if successful send a created response with the user
            res.status(201).json({ saveUser });
        } catch (error) {
            // if cannot save, send a bad request status
            console.error(error);
            res.status(400).json({ error: error });
        }
    }
});

router.post("/login", async (req, res) => {
    // the validation is in both the registration and login in case email is added later for registration.
    const validation = validateUserDetails.validate({
        displayName: req.body.displayName.trim(),
        password: req.body.password.trim(),
    });
    // check whether the formatting on the input fields is correct.
    if (validation.error) {
        res.status(400).json({ error: validation.error.details[0].message });
    } else {
        // try to find the user in the database, if they do not exist, exit
        const userLogin = await User.findOne({
            displayName: req.body.displayName.trim(),
        });
        if (!userLogin)
            return res
                .status(400)
                .json({ error: "The user/password combination is incorrect." });

        // if the user does exist in the db, check whether the password is correct, if not send to catch.
        const loggedIn = bcrypt.compareSync(
            req.body.password,
            userLogin.password
        );
        if (loggedIn) {
            // the user is logged in
            // create a JWT token for the user
            // create a token and expire it in an hour
            const token = jwt.sign({ id: userLogin.id }, process.env.JWT_KEY, {
                expiresIn: 3600,
            });
            res.status(200);
            res.json({ token });
        } else {
            res.status(400).json({
                error: "The user/password combination is incorrect.",
            });
        }
    }
});

module.exports = router;
