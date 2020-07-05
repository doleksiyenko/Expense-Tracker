import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// Context
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
// Components
import TransactionDashboard from "./components/TransactionDashboard/TransactionDashboard";
import Login from "./components/Login/Login";

import "./App.css";

function App() {
    return (
        <Router>
            <AuthProvider>
                <TransactionProvider>
                    <PrivateRoute
                        exact
                        path="/"
                        component={TransactionDashboard}
                    />
                </TransactionProvider>
                <Route exact path="/login" component={Login}></Route>
            </AuthProvider>
        </Router>
    );
}

export default App;
