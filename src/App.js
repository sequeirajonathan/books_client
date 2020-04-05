import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header/header.component";
import Login from "./pages/login/login.component";
import Store from "./pages/book.store/book.store.component";
import ProtectedRoute from "./components/protected/protected.route.component";
import AddBookForm from "./components/form/form.component";

export default function App(props) {
  const [loggedInUser, setLoggedInUser] = useState(
    window.localStorage.getItem("user")
  );
  const [searchedBook, setSearchedBook] = useState("");
  const [authType, setAuthType] = useState("");
  const [auth, setAuth] = useState(
    window.localStorage.getItem("auth") === "true" ? true : false
  );
  const [bookCodeGen, setBookCodeGen] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const CreateDB = async () => {
      await axios.get(`https://mysql-bookstore-api.herokuapp.com/create`);
    };
    CreateDB();

    const genBookCode = async () => {
      let unusedBookCode = false;
      let genedBookCode = Math.floor(1000 + Math.random() * 9000);
      let bookCodes = await axios.get(
        `https://mysql-bookstore-api.herokuapp.com/book?bookCode=${genedBookCode}`
      );

      while (!unusedBookCode) {
        if (!bookCodes.data.includes(genedBookCode)) {
          unusedBookCode = true;
        } else {
          genedBookCode = Math.floor(1000 + Math.random() * 9000);
        }
      }

      setBookCodeGen(genedBookCode);
    };

    genBookCode();
  }, []);

  useEffect(() => {}, [auth]);

  const search = (searchValue) => {
    setSearchedBook(searchValue);
  };

  const signOut = ({ auth, userName }) => {
    setAuth(auth);
    setLoggedInUser(userName);
  };

  const isLoggedIn = (payload) => {
    if (payload.authType === "LOGIN" && !payload.errors && payload.auth) {
      setLoggedInUser(payload.userName);
      setAuthType(payload.authType);
      setAuth(payload.auth);
      window.localStorage.setItem("auth", "true");
      window.localStorage.setItem("user", `${payload.userName}`);
    } else {
      setErrors(payload.errors);
      window.localStorage.setItem("auth", "false");
      window.localStorage.setItem("user", "");
    }
  };

  const isSignedUp = (payload) => {
    if (payload.authType === "SIGNUP" && !payload.errors && payload.auth) {
      setLoggedInUser(payload.userName);
      setAuthType(payload.authType);
      setAuth(payload.auth);
      window.localStorage.setItem("auth", "true");
      window.localStorage.setItem("user", `${payload.userName}`);
    } else {
      setErrors(payload.errors);
      window.localStorage.setItem("auth", "false");
      window.localStorage.setItem("user", "");
    }
  };

  return (
    <div>
      <Header
        searchString={search}
        isLoggedIn={auth}
        userName={loggedInUser}
        signOut={signOut}
      />
      <Switch>
        <Route
          exact
          path="/login"
          component={(props) => (
            <Login
              {...props}
              user_login={isLoggedIn}
              user_signup={isSignedUp}
            />
          )}
        />
        <ProtectedRoute
          exact
          path="/"
          isLoggedIn={auth}
          component={(props) => (
            <Store {...props} searchedBook={searchedBook} />
          )}
        />
        <ProtectedRoute
          exact
          path="/add-book"
          isLoggedIn={auth}
          component={(props) => <AddBookForm {...props} bookCode={bookCodeGen} />}
        />
      </Switch>
    </div>
  );
}
