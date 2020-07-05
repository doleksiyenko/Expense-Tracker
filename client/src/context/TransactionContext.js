import React, { createContext, useState } from "react";

// create a context for providing user transactions
export const TransactionContext = createContext();

// provide the transaction state context to children
export const TransactionProvider = ({ children }) => {
    const [transaction, setTransactions] = useState([]);
    return (
        <TransactionContext.Provider value={[transaction, setTransactions]}>
            {children}
        </TransactionContext.Provider>
    );
};
