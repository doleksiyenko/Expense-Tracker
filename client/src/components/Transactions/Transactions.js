import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import Transaction from "../Transaction/Transaction";

// style
import "./Transactions.css";

const Transactions = () => {
    const [transaction, setTransactions] = useContext(TransactionContext);
    useEffect(() => {
        // ON COMPONENT LOAD, FETCH THE USER'S TRANSACTIONS FROM THE SERVER
        const getTransactions = async () => {
            // get the token from local storage
            let token = localStorage.getItem("auth-token");
            // try to fetch the transactions from the server
            const response = await fetch(
                "http://localhost:5000/api/transactions",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    method: "POST",
                }
            );
            const transactions = await response.json();
            if (response.status === 200) {
                setTransactions(transactions);
            } else {
                return setTransactions([transactions.error]);
            }
        };
        getTransactions();
    }, []);

    return (
        <ul id="transaction-list">
            {transaction.map((transaction) => (
                <Transaction key={transaction._id} transaction={transaction} />
            ))}
        </ul>
    );
};

export default Transactions;
