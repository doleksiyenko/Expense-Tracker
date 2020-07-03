const express = require("express");
const router = express.Router();

// Models
const User = require("../models/User");

router.post("/register", (req, res) => {
    res.send("register");
});

router.post("/login", (req, res) => {
    res.send("login");
});

module.exports = router;
