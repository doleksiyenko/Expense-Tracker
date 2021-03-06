import React from "react";
import { useHistory } from "react-router-dom";

import "./TransactionHeader.css";

const TransactionHeader = () => {
    const history = useHistory();

    const Logout = () => {
        // logout out of the site
        // get the auth-token
        let token = localStorage.getItem("auth-token");
        if (token) {
            // if the token exists, delete it, and then redirect to the login page
            localStorage.removeItem("auth-token");
            history.push("/login");
        } else {
            // if the token doesn't exist, just push to the login page
            history.push("/login");
        }
    };

    return (
        <div id="transaction-header">
            <h1>Expense Tracker</h1>
            <button className="primary-button" onClick={Logout}>
                Logout
            </button>
        </div>
    );
};

export default TransactionHeader;
