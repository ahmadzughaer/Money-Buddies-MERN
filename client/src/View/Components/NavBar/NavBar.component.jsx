import React, { useEffect, useState } from "react";
import "./NavBar.style.css";
import logo from "../../Assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
function NavBar(props) {
  let navigate = useNavigate();
  let [token, setToken] = useState("");
  let [logButton, setLogButton] = useState("Login");
  
  // useEffect(() => {
  //   token = localStorage.getItem("token")
  //   isLoggedIn()
  //  }, [])
  // function isLoggedIn() {
  //   if(token === null) {
  //     setLogButton("Logout")
  //   }
  //   else if( token !== null) {
  //     setLogButton("Login")
  //   }
  // }


  const logOut = () => {
    localStorage.setItem("token", null);
    navigate("/");
  };

  

  return (
    <div className="NavBar" id={props.id}>
      <Link className="NavBarLink" to={"/"}>
        <img className="Logo" src={logo} alt="logo"></img>
      </Link>
      {/* <Link className="NavBarLink" to={"/login"}>
        {props.text}
      </Link> */}
           <Button
          className="button_style"
          variant="contained"
          size="small"
          onClick={logOut}
        >
            {props.text}
        </Button>
      <Link className="NavBarLink" to={"/about"}>
        About
      </Link>
    </div>
  );
}

export default NavBar;
