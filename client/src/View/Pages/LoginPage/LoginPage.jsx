import React, { useState } from "react";
import swal from "sweetalert";
import { Button, TextField } from "@mui/material";
import "./LoginPage.style.css";
import { Link } from "react-router-dom";

import logo from "../../Assets/images/logo.png";
import { useNavigate } from "react-router-dom";
const axios = require("axios");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const login = () => {
    // const pwd = bcrypt.hashSync(password, salt);
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        navigate("/user");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });
  };

  return (
    <div className="main">
      <div className="login-box">
        <Link to={"/"}>
          <img className="Logo" src={logo} alt="logo"></img>
        </Link>
        <div>
          <h2>Login</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="email"
            autoComplete="off"
            name="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            required
          />
          <br />
          <br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={email == "" && password == ""}
            onClick={login}
          >
            Login
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
}
