import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";
import "./header.component.css";
export default function Header(props) {
  const [navTitle] = useState("Henry's Books");
  const [placeHolder] = useState("Search Books...");
  const [searchValue, setSearchValue] = useState("");
  let history = useHistory();

  const handleSearchInputChanges = e => {
    let value = e.target.value;
    setSearchValue(value);
    props.searchString(value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.searchString(searchValue);
    resetInputField();
  };

  const handleLogin = e => {
    e.preventDefault();
    history.push("/login");
  };

  const handleSignOut = e => {
    e.preventDefault();
    let killSession = {
      auth: false,
      userName: ""
    };
    props.signOut(killSession);
  };

  const handleAddBook = e => {
    e.preventDefault();
    history.push("/add-book");
  };

  const handleStore = e => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand>{navTitle}</Navbar.Brand>
      <Nav className="mr-auto">
        {props.isLoggedIn ? (
          <Nav.Link onClick={handleStore}>Book Store</Nav.Link>
        ) : null}
        {props.isLoggedIn ? (
          <Nav.Link onClick={handleAddBook}>Add Book</Nav.Link>
        ) : null}
      </Nav>
      <Form inline>
        <FormControl
          type="text"
          placeholder={placeHolder}
          onChange={handleSearchInputChanges}
          className="mr-sm-2"
        />
        <Button variant="outline-info" onClick={callSearchFunction}>
          Search
        </Button>

        {props.isLoggedIn ? (
          <Nav.Link>{props.userName}</Nav.Link>
        ) : (
          <Nav.Link onClick={handleLogin}>Login</Nav.Link>
        )}
        {props.isLoggedIn ? (
          <Nav.Link onClick={handleSignOut}>sign out</Nav.Link>
        ) : null}
      </Form>
    </Navbar>
  );
}
