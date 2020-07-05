import React, { createContext, useReducer } from "react";

// Context
export const GlobalContext = React.createContext();

const initialState = {
    transactions: {},
};

const transactionReducer = (state, action) => {
    switch (action.type) {
        case "GET_TRANSACTIONS":
            state.transactions = ["get transactions"];
        case "CREATE_TRANSACTION":
            state.transactions = ["create transactions"];
        case "DELETE_TRANSACTION":
            state.transactions = ["delete transactions"];
        default:
            return initialState;
    }
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionReducer, initialState);
    return (
        <GlobalContext.Provider
            value={{ transactionState: state, transactionDispatch: dispatch }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
