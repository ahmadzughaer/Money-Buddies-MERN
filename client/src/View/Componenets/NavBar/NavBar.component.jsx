import React from "react";
import "./NavBar.style.css";
import logo from "../../Assets/images/logo.png";
import { Link } from "react-router-dom";
function NavBar(props) {

  
  return (
    <div className="NavBar" id={props.id}>
      <Link className="NavBarLink" to={"/"}>
        <img className="Logo" src={logo} alt="logo"></img>
      </Link>
      <Link className="NavBarLink" to={"/login"}>
        {props.text}
      </Link>
      <Link className="NavBarLink" to={"/about"}>
        About
      </Link>
    </div>
  );
}

export default NavBar;
