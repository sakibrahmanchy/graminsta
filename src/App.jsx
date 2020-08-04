import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import './App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import { auth, PrivateRoute} from "./utils/auth";


/**
 * Render App
 * @returns {*}
 * @constructor
 */
function App() {
  return (
    <div className="flexwrapper">
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => {
                        return (
                            auth.isAuthenticated ?
                                <Redirect to="/dashboard" /> :
                                <Redirect to="/login" />
                        );
                    }}
                />
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute
                    path="/profile/:id"
                    component={Profile}
                />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
