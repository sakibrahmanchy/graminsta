import {getCookie} from "./cookie";
import {Redirect, Route} from "react-router-dom";
import React from "react";

/**
 * Authentication methods to check cookies and handle auth.
 * @type {{authenticate(*): void, signout(*=): void, isAuthenticated: boolean}}
 */
export const auth = {
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

/**
 * Private Routes which prevents rendering until login.
 *
 * @param ChildComponent
 * @param rest
 * @returns {*}
 * @constructor
 */
export const PrivateRoute = ({ component: ChildComponent, ...rest })  => {
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
