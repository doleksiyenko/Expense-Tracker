import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";
// styles
import "./TransactionInput.css";

const TransactionInput = () => {
    const [value, setValue] = useState("");
    const [expenseMessage, setExpenseMessage] = useState("");
    const [transactionType, setTransactionType] = useState("Expense");
    const [transactions, setTransactions] = useContext(TransactionContext);
    const history = useHistory();

    const createTransaction = async (e) => {
        e.preventDefault();

        if (isNaN(value)) {
            // the value input is not a number
            return null;
        }

        if (value && expenseMessage) {
            let decimalValue = Math.round(value * 100) / 100;

            if (transactionType === "Expense") {
                decimalValue = -decimalValue;
            }
            let token = localStorage.getItem("auth-token");
            // send a create fetch request to the server
            if (token) {
                const response = await fetch(
                    "http://localhost:5000/api/transactions/create",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                        method: "POST",
                        body: JSON.stringify({
                            expense: decimalValue,
                            expenseMessage: expenseMessage,
                        }),
                    }
                );
                const createdTransaction = await response.json();
                if (response.status === 201) {
                    setTransactions([...transactions, createdTransaction]);
                    setValue("");
                    setExpenseMessage("");
                } else {
                    console.log(response.error);
                }
            } else {
                history.push("/");
            }
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
