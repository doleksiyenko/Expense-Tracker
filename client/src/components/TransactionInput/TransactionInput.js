import React from "react";

// styles
import "./TransactionInput.css";

const TransactionInput = () => {
    const createTransaction = (e) => {
        e.preventDefault();
    };

    return (
        <div id="transaction-input">
            <form id="create-transaction-form">
                <select className="roundedInput" id="transaction-type-selector">
                    <option>Expense</option>
                    <option>Income</option>
                </select>
                <input className="roundedInput" placeholder="Value"></input>
                <input className="roundedInput" placeholder="Note"></input>
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
