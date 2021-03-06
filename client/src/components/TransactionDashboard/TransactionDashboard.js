import React from "react";

// components
import Transactions from "../Transactions/Transactions";
import TransactionHeader from "../TransactionHeader/TransactionHeader";
import TransactionInput from "../TransactionInput/TransactionInput";

// styles
import "./TransactionDashboard.css";
import TransactionTotals from "../TransactionTotals/TransactionTotals";

const TransactionDashboard = () => {
    return (
        <div id="transaction-dashboard">
            <TransactionHeader />
            <div id="main-content">
                <TransactionTotals />
                <Transactions />
                <TransactionInput />
            </div>
        </div>
    );
};

export default TransactionDashboard;
