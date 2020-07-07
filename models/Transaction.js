const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    userId: { type: String, required: true },
    expense: { type: Number, required: true },
    expenseMessage: String,
    transactionDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
