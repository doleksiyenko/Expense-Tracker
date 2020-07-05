import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                    console.log(token);
                    localStorage.setItem("auth-token", token.token);
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
            <h1>Login</h1>
            <form onSubmit={logIn}>
                <input
                    value={username}
                    placeholder="Enter your username!"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                ></input>
                <input
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;
