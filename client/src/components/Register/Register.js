import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import EntryHeader from "../EntryHeader/EntryHeader";
import EntryForm from "../EntryForm/EntryForm";
const Register = ({ page }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
            console.log(registeredUser);
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
                // a bad request, show the an error card
                console.log(token);
            }
        } else {
            console.log(registerUser.error);
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
        </div>
    );
};

export default Register;
