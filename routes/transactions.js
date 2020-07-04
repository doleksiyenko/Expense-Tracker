const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

const verifyToken = require("../middleware/verifyToken");

// Private Post route: retrieve a user's transactions
router.post("/transactions", verifyToken, async (req, res) => {
    res.send(req.user.id);
});

// Private Post route: Create a user transaction
router.post("/transactions/create", verifyToken, async (req, res) => {
    res.send(req.body);
});

// Private Post route: delete a user's transaction with <id>
router.post("/transactions/delete/:id", verifyToken, async (req, res) => {
    res.send(req.body);
});

module.exports = router;
