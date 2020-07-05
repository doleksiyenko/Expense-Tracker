import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
// Context
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [auth, setAuth] = useContext(AuthContext);
    const [tokenValidated, setTokenValidated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // send the token to the API to check if the token is still valid
        const validateToken = async () => {
            // get the token current saved in storage
            let token = localStorage.getItem("auth-token");
            if (token) {
                const response = await fetch(
                    "http://localhost:5000/api/transactions",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                        method: "POST",
                    }
                );
                // if the token successfully connected to the API
                if (response.status === 200) {
                    setAuth(true);
                    setTokenValidated(true);
                    history.push("/");
                } else {
                    // couldn't successfully get from the API, token is invalid, remove token
                    setAuth(false);
                    localStorage.removeItem("auth-token");
                    setTokenValidated(true);
                }
            } else {
                // a token doesn't exist in local storage
                setTokenValidated(true);
            }
        };
        validateToken();
    }, [history]);

    if (!tokenValidated) {
        return <div />;
    }
    return (
        <Route
            {...rest}
            render={(props) => {
                // check if the user is authenticated, if they are send them to the private route,
                // if not redirect them to the login page.
                return auth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
};

export default PrivateRoute;
