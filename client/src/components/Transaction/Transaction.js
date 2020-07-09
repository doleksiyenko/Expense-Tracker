import React, { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { useHistory } from "react-router-dom";
import "./Transaction.css";

const Transaction = ({ transactionId, expense, expenseMessage }) => {
    const history = useHistory();
    const [transactions, setTransactions] = useContext(TransactionContext);

    const deleteTransaction = async (transactionId) => {
        // delete a transaction
        let token = localStorage.getItem("auth-token");
        if (token) {
            const response = await fetch(
                `http://localhost:5000/api/transactions/delete/${transactionId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    method: "POST",
                }
            );
            if (response.status === 204) {
                // the post was successfully deleted
                // remove the post from the "transaction" context to update the interface'
                setTransactions(
                    transactions.filter(
                        (element) => element._id != transactionId
                    )
                );
            } else {
                // there was an error deleting the post (token is invalid)
                history.push("/");
            }
        } else {
            history.push("/");
        }
    };

    return (
        <li id="transaction-card">
            <span id={expense === Math.abs(expense) ? "gain" : "loss"}>■</span>
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
