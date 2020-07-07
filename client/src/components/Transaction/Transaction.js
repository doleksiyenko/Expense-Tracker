import React from "react";
import Transactions from "../Transactions/Transactions";

import "./Transaction.css";

const Transaction = ({ expense, expenseMessage }) => {
    return (
        <li id="transaction-card-addition">
            {expense}, {expenseMessage}
        </li>
    );
};

export default Transaction;
