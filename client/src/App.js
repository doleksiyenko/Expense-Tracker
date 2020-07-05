import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
//components
import TransactionDashboard from "./components/TransactionDashboard/TransactionDashboard";
import Login from "./components/Login/Login";

import "./App.css";

function App() {
    return (
        <Router>
            <PrivateRoute exact path="/" component={TransactionDashboard} />
            <Route exact path="/login" component={Login}></Route>
        </Router>
    );
}

export default App;
