import React, { useState, useEffect, useContext } from "react";
import "./TransactionTotals.css";

import { TransactionContext } from "../../context/TransactionContext";

const TransactionTotals = () => {
    const [expense, setExpense] = useState(0);
    const [gain, setGain] = useState(0);

    const [transactions, setTransactions] = useContext(TransactionContext);

    useEffect(() => {
        // when the component loads, get all the transactions that
        // were loaded in the "Transactions" components, and calculate
        // the total expense/gain
        let positive = 0;
        let negative = 0;
        transactions.forEach((transaction) => {
            if (Math.abs(transaction.expense) == transaction.expense) {
                // the transaction is positive, add to gain
                positive += transaction.expense;
            } else {
                negative += expense + Math.abs(transaction.expense);
            }
        });
        setGain(positive);
        setExpense(negative);
    }, [transactions]);
    return (
        <div id="transaction-totals">
            <span id="total-gain">+{gain}</span>
            <div className="verticalLine"></div>
            <span id="total-loss">-{expense}</span>
        </div>
    );
};

export default TransactionTotals;
