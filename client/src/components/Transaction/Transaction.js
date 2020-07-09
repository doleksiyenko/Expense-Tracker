import React from "react";
import Transactions from "../Transactions/Transactions";

import "./Transaction.css";

const deleteTransaction = (transactionId) => {
    // delete a transaction
    console.log(transactionId);
};

const Transaction = ({ transactionId, expense, expenseMessage }) => {
    return (
        <li id="transaction-card">
            <span id={expense == Math.abs(expense) ? "gain" : "loss"}>■</span>
            <div id="expensemessage">
                {expense}, {expenseMessage}
            </div>
            <button
                id="deleteTransaction"
                onClick={() => deleteTransaction(transactionId)}
            >
                <b>x</b>
            </button>
        </li>
    );
};

export default Transaction;
