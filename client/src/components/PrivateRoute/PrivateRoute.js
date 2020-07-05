import React, { Component, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [auth, setAuth] = useState(true);
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
