import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import EntryHeader from "../EntryHeader/EntryHeader";
import EntryForm from "../EntryForm/EntryForm";
const Register = ({ page }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [auth, setAuth] = useContext(AuthContext);

    const history = useHistory();

    const registerUser = async (e) => {
        e.preventDefault();
        // register the user into the database
        const response = await fetch(
            "http://localhost:5000/auth/user/register",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    displayName: username,
                    password: password,
                }),
            }
        );
        const registeredUser = await response.json();
        if (response.status === 201) {
            // the user was registered succesfully, log in the user, and redirect them to the dashboard
            const response = await fetch(
                "http://localhost:5000/auth/user/login",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        displayName: username,
                        password: password,
                    }),
                }
            );
            const token = await response.json();
            if (response.status === 200) {
                // if the login is successful, get the authentication token
                localStorage.setItem("auth-token", token.token);
                setAuth(true);
                history.push("/");
            } else {
                // a bad request, show the error card
                setError(registeredUser.error);
            }
        } else {
            setError(registeredUser.error);
        }
    };

    return (
        <div>
            <EntryHeader page={"Register"} />
            <span style={{ display: "flex", justifyContent: "center" }}>
                Register a new user.
            </span>
            <EntryForm
                page={"Register"}
                submitFunction={registerUser}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
            ></EntryForm>
            <span id="errorMessage">
                {error ===
                '"displayName" must only contain alpha-numeric characters'
                    ? "Username must only contain alpha-numeric characters (a-z, A-Z, 0-9)"
                    : error}
            </span>
        </div>
    );
};

export default Register;
