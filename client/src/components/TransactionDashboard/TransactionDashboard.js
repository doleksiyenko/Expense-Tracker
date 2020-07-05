import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const TransactionDashboard = () => {
    // reducer for the user's transactions
    const [transaction, setTransactions] = useContext(TransactionContext);
    useEffect(() => {
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
        <div>
            <h1>TransactionDashboard</h1>
            {transaction.map((transaction) => (
                <p key={transaction._id}>
                    {transaction.expenseMessage}, {transaction.expense}
                </p>
            ))}
        </div>
    );
};

export default TransactionDashboard;
