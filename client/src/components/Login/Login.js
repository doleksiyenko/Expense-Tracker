import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// component
import EntryHeader from "../EntryHeader/EntryHeader";
// styles
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [auth, setAuth] = useContext(AuthContext);
    const history = useHistory();

    const logIn = async (e) => {
        e.preventDefault();
        // try to use the log the user in and get the token from the log in
        if (username.trim() && password.trim()) {
            try {
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
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <EntryHeader page={"Login"} />
            <div>
                <form id="login-form" onSubmit={logIn}>
                    <input
                        className="roundedInput formInput"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    ></input>
                    <input
                        className="roundedInput formInput"
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></input>
                    <button
                        style={{ width: 80, height: 40 }}
                        className="primary-button"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
