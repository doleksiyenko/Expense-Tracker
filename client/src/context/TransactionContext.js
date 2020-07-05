import React, { createContext, useReducer } from "react";

// create a context for providing user transactions
export const TransactionContext = createContext();

const initialState = { transactions: [] };

// A reducer for retrieving, creating and deleting transactions from the server
const transactionReducer = (state, action) => {
    switch (action.type) {
        case "GET_TRANSACTIONS":
            return { transactions: ["GET TRANSACTION"] };
        default:
            throw new Error();
    }
};

// provide the useReducer context to children
export const TransactionProvider = ({ children }) => {
    const [transactionState, transactionDispatch] = useReducer(
        transactionReducer,
        initialState
    );
    return (
        <TransactionContext.Provider
            value={[transactionState, transactionDispatch]}
        >
            {children}
        </TransactionContext.Provider>
    );
};
