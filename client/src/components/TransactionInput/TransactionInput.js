import React, { useState } from "react";

// styles
import "./TransactionInput.css";

const TransactionInput = () => {
    const [value, setValue] = useState("");
    const [expenseMessage, setExpenseMessage] = useState("");
    const [transactionType, setTransactionType] = useState("Expense");

    const createTransaction = (e) => {
        e.preventDefault();

        if (isNaN(value)) {
            // the value input is not a number
            return null;
        }

        if (value && expenseMessage) {
            console.log(
                Math.round(value * 100) / 100,
                expenseMessage,
                transactionType
            );
        }
    };

    return (
        <div id="transaction-input">
            <form id="create-transaction-form">
                <select
                    defaultValue={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="roundedInput"
                    id="transaction-type-selector"
                >
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                </select>
                <input
                    value={value}
                    onChange={(e) => {
                        // replace any non-digit or decimal with the empty string
                        // to make this a numeric only input
                        setValue(e.target.value.replace(/[^.\d]+/, ""));
                    }}
                    className="roundedInput"
                    placeholder="Value"
                ></input>
                <input
                    value={expenseMessage}
                    onChange={(e) => setExpenseMessage(e.target.value)}
                    className="roundedInput"
                    placeholder="Note"
                ></input>
                <button
                    className="roundedInput primary-button"
                    onClick={(e) => createTransaction(e)}
                >
                    Add to Tracker
                </button>
            </form>
        </div>
    );
};

export default TransactionInput;
