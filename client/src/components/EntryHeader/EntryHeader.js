import React from "react";
import { useHistory } from "react-router-dom";

// styling in TransactionHeader.css

const EntryHeader = ({ page }) => {
    const history = useHistory();

    return (
        <div id="transaction-header">
            <h1>{page}</h1>
            {page === "Register" ? (
                <button
                    className="primary-button"
                    onClick={() => history.push("/login")}
                >
                    Login
                </button>
            ) : (
                <button
                    className="primary-button"
                    onClick={() => history.push("/register")}
                >
                    Register
                </button>
            )}
        </div>
    );
};

export default EntryHeader;
