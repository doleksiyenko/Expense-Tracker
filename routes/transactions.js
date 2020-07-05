const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

const verifyToken = require("../middleware/verifyToken");

// Private Post route: retrieve a user's transactions
router.post("/transactions", verifyToken, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve transactions." });
    }
});

// Private Post route: Create a user transaction
router.post("/transactions/create", verifyToken, async (req, res) => {
    try {
        // create a new transaction with the details provided in req.body
        const newTransaction = new Transaction({
            userId: req.user.id,
            expense: req.body.expense,
            expenseMessage: req.body.expenseMessage,
        });
        // save the transaction to the database
        let saveTransaction = await newTransaction.save();
        // successfully created
        res.status(201).json(saveTransaction);
    } catch (error) {
        res.status(400).send("Could not create transaction");
    }
});

// Private Post route: delete a user's transaction with <id>
router.post("/transactions/delete/:id", verifyToken, async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(204).send("Transaction deleted.");
    } catch (error) {
        res.status(400).send("Could not delete transaction.");
    }
});

module.exports = router;
