import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { auth } from './firebase.js';
import { useState } from 'react';
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault(); //This stops the refresh
    //do the login logic...
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        //! .then means everything is going well
        //* logged in, redirect to homepage...
        history.push('/'); //*STEP 1 : Only when succesfully logged in --> You redirect
      })
      //! an error
      .catch((e) => alert(e.message));
  };
  const register = (e) => {
    e.preventDefault(); //This stops the refresh
    //do the register logic...
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //! .then means everything is going well
        //created a user and logged in...
        history.push('/'); //*STEP 1 : Only when succesfully registered --> You redirect
      })
      //! an error
      .catch((e) => alert(e.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button onClick={login} type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON's Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
