import React, { useState, useEffect } from 'react';
import BackgroundImage from './images/login.jpeg';
import { setCookie, getCookie } from './cookies';
import ReactDOM from "react-dom";
import { Redirect } from 'react-router'
export default function Login ({ onSuccessfulLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const getField = (fieldId) => {
        return document.getElementById(fieldId);
    };

    const loginValidated = (token) => {
        setCookie('token', token, 60*1000);
        setRedirect(true);
    };

    const loginUser = (email, password) => {
        fetch('http://localhost:8078/login', {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Basic ${getCookie('token')}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                email,
                password,
            })
        }).then(res => res.json()).then(res => {
            if (res.token) {
               loginValidated(res.token);
            }
        }).catch(e => {
            throw e;
        });
    } ;

    const typeAuto = async (text, fieldId) => {
        const data = text.split('');
        const field = getField(fieldId);
        field.value = '';
        await (async function autoTypeMe() {
            var letter = data.shift();
            field.value += letter;
            if (data.length) {
                setTimeout(await autoTypeMe, 20);
            }
        }());
    };

    const loginWithMockUser = async () => {
        const email = 'mockuser@graminsta.com';
        const password = 'mockuser';
        await typeAuto(email, 'email');
        await typeAuto(password, 'password');
        await loginUser(email, password);
    };

    return (
        <div>
            {redirect && <Redirect to="/dashboard" />}
           <img alt="" src={BackgroundImage} className="bg-image"/>
            <div className="login-form overlay">
                <div className="text-center curl-fonts large-fonts">
                    <h1 style={{ color: '#ed576b' }}><b>Gram<i>Insta</i></b></h1>
                </div>
                <br/>
                <div>
                    <h2 className="text-center">Login</h2>
                    <div className="content">
                        <div className="input-field">
                            <input
                                type="email"
                                placeholder="Email"
                                autoComplete="nope"
                                id="email"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                disabled
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Password"
                                autoComplete="new-password"
                                id="password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                disabled
                            />
                        </div>
                        <a className="link">gramInsta, love thy art</a>
                    </div>
                    {/*<div className="action">*/}
                    {/*    <button className="btn-red">Register</button>*/}
                    {/*    <button onClick={() => loginUser(email, password)}>Sign in</button>*/}
                    {/*</div>*/}
                    <div>
                        <button className="btn-red" onClick={loginWithMockUser}>Login as mock user</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

