import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NavBar from "../../Componenets/NavBar/NavBar.component";
export default function UserAccount() {
  let navigate = useNavigate();
  let [token, setToken] = useState("");
  let [userName, setUserName] = useState("");

  useEffect(() => {
    token = localStorage.getItem("token");
    navigate("/user");
    getUser();
  }, []);

  const logOut = () => {
    localStorage.setItem("token", null);
    navigate("/");
  };

  const getUser = () => {
    token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserName(decoded.user);
  };


  {
    return (
      <div>
        <NavBar/>
        <Button
          className="button_style"
          variant="contained"
          size="small"
          onClick={logOut}
        >
          Log Out
        </Button>
        <h1>{`Welcome ${userName}`}</h1>
      </div>
    );
  }
}
