import React, {useState} from 'react';
import './App.css';
import Login from './login';
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import { getCookie } from './cookies';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const auth = {
    isAuthenticated: false,
    authenticate(cb) {
        if (getCookie('token') !== '') {
            auth.isAuthenticated = true;
        }
    },
    signout(cb) {
        auth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

function PrivateRoute({ component: ChildComponent, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                getCookie('token') !== '' ? (
                    <ChildComponent {...props} {...rest}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

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
