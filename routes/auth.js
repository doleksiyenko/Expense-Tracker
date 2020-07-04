const express = require("express");
const router = express.Router();

const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const userValidation = require("../validation");
// Models
const User = require("../models/User");
const validateUserDetails = require("../validation");

router.post("/register", async (req, res) => {
    // validate
    const validation = validateUserDetails.validate({
        displayName: req.body.displayName,
        password: req.body.password,
    });
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
    } else {
        // encrypt the password
        // const salt = bcrypt.genSalt();
        const hash = bcrypt.hashSync(req.body.password, 10);
        // the validation succeeded, so create the new user
        const newUser = new User({
            displayName: req.body.displayName,
            password: hash,
        });
        // try saving the user to the database
        try {
            let saveUser = await newUser.save();
            // if successful send a created response with the user
            res.status(201).send(saveUser);
        } catch (error) {
            // if cannot save, send a bad request status
            console.error(error);
            res.status(400).send(error);
        }
    }
});

router.post("/login", (req, res) => {
    res.send("login");
});

module.exports = router;
