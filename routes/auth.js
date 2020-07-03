const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();

const userValidation = require("../validation");
// Models
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const userDetails = {
        displayName: req.body.displayName,
        password: req.body.password,
    };
    // validate the user and password

    // encrypt the password

    // create the new user
    const newUser = new User(userDetails);
    // try saving the user to the database
    try {
        let saveUser = await newUser.save();
        console.log(saveUser);
        // if successful send a created response with the user
        res.status(201).send(saveUser);
    } catch (error) {
        // if cannot save, send a bad request status
        console.error(error);
        res.status(400).send(error);
    }
});

router.post("/login", (req, res) => {
    res.send("login");
});

module.exports = router;
