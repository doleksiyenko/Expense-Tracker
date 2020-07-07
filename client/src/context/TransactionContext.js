import React, { createContext, useState } from "react";

// create a context for providing user transactions
export const TransactionContext = createContext();

// provide the transaction state context to children
export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    return (
        <TransactionContext.Provider value={[transactions, setTransactions]}>
            {children}
        </TransactionContext.Provider>
    );
};
