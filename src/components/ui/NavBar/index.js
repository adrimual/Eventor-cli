import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import AuthService from "../../../services/AuthService";

import { Link, NavLink } from "react-router-dom";

import "./navbar.css";

const Navigation = (props) => {
  const authService = new AuthService();

  const logout = () => {
    authService
      .logout()
      .then(() => {
        props.setTheUser(false);
        props.handleToast(true, "See you soon!");
      })
      .catch(
        (err) =>
          err.response && props.handleToast(true, err.response.data.message)
      );
  };

  return (
    <Navbar className="nav" bg="dark" variant="light" expand="lg" sticky="top">
      <Navbar.Brand>
        <Link to="/">Go-Ride</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as="span">
            <NavLink
              to="/"
              exact
              activeStyle={{ color: "white", fontWeight: 900 }}
            >
              Home
            </NavLink>
          </Nav.Link>
          {props.loggedInUser ? (
            <Nav.Link as="span">
              <span className="pointer logout" onClick={logout}>
                Log out
              </span>
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as="span">
                <NavLink
                  to="/signup"
                  activeStyle={{ color: "white", fontWeight: 900 }}
                >
                  Sign up
                </NavLink>
              </Nav.Link>
              <Nav.Link as="span">
                <NavLink
                  to="/login"
                  activeStyle={{ color: "white", fontWeight: 900 }}
                >
                  Log in
                </NavLink>
              </Nav.Link>
            </>
          )}
          <Nav.Link as="span">
            {props.loggedInUser ? (
              <NavLink
                to={`/profile/${props.loggedInUser._id}`}
                activeStyle={{ color: "white", fontWeight: 900 }}
              >
                {" "}
                Hi, @{props.loggedInUser.username}
              </NavLink>
            ) : (
              <NavLink to={`/login`}>Hi, friend</NavLink>
            )}
          </Nav.Link>
          <Nav.Link as="span" className="green-bg-btn">
            <NavLink
              to={`/events`}
              activeStyle={{ color: "white", fontWeight: 900 }}
            >
              Events
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
