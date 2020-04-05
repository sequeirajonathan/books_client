import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./login.component.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [userName, setUserName] = useState("");
  const [authType, setAuthType] = useState("");
  const [auth, setAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const payload = {
      userName,
      authType,
      auth,
      errors
    };

    if (authType === "LOGIN") {
      props.user_login(payload);
      if (payload.auth) {
        history.push("/");
      }
    } else {
      props.user_signup(payload);
      if (payload.auth) {
        history.push("/");
      }
    }
  });

  const handleSignup = async event => {
    postUser(email, password);
  };

  const handleLogin = event => {
    getUser(email, password);
  };

  const postUser = (email, password) => {
    try {
      const fetchUser = async () => {
        const user = await axios.post(
          `https://mysql-bookstore-api.herokuapp.com/login?email=${email}&password=${password}`
        );

        setUserName(user.data.email);
        setAuthType(user.data.authType);
        setAuth(user.data.auth);
      };

      fetchUser();
    } catch (error) {
      setErrors(error);
    }
  };

  const getUser = (email, password) => {
    try {
      const fetchUser = async () => {
        const user = await axios.get(
          `https://mysql-bookstore-api.herokuapp.com/login?email=${email}&password=${password}`
        );
        setUserName(user.data.email);
        setAuthType(user.data.authType);
        setAuth(user.data.auth);
      };

      fetchUser();
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="login">
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          onChange={e => setEmail(e.target.value)}
        />
        <i className="zmdi zmdi-account zmdi-hc-lg"></i>
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
      </div>
      <div className="login-singup">
        <button type="submit" onClick={handleLogin}>
          Log In
        </button>
        <button type="submit" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
