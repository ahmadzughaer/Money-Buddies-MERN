import React, { useEffect, useState } from "react";
import "./NavBar.style.css";
import logo from "../../Assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import jwt_decode from "jwt-decode";

function NavBar() {
  let navigate = useNavigate();
  let [logButton, setLogButton] = useState("Login");
  let [userName, setUserName] = useState("");
  let token = localStorage.getItem("token");

  useEffect(() => {
    isLoggedIn();
    getUser();
  }, []);

  // login button change 
  const isLoggedIn = () => {
    if (token === "null" || token === null) {
      setLogButton("Login");
    } else {
      setLogButton("Logout");
    }
  };

  // get user from token and set his/her name
  const getUser = () => {
    if (token === "null" || token === null) {
      return;
    } else {
      const decoded = jwt_decode(token);
      setUserName(decoded.user);
    }
  };

  // logout functionally 
  const loginOrOut = () => {
    if (token === "null" || token === null) {
      navigate("/login");
    } else {
      localStorage.setItem("token", null);
      window.location = "/";
    }
  };

  return (
    <div className="NavBar">
      <Link className="NavBarLink" to={"/"}>
        <img className="Logo" src={logo} alt="logo"></img>
      </Link>
      <div className="user-links">
        <Link className="NavBarLink" to={"/users"}>
          {userName}
        </Link>
        <Button
          className="button_style"
          variant="contained"
          size="small"
          onClick={loginOrOut}
        >
          {logButton}
        </Button>
      </div>
      <Link className="NavBarLink" to={"/about"}>
        About
      </Link>
    </div>
  );
}

export default NavBar;
