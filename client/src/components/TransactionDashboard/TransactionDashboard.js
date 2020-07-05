import React, { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const TransactionDashboard = () => {
    // reducer for the user's transactions
    const [transactionState, transactionDispatch] = useContext(
        TransactionContext
    );
    return <h1>TransactionDashboard</h1>;
};

export default TransactionDashboard;
