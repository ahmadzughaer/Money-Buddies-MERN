import React, { useState } from "react";
import swal from "sweetalert";
import { Button, TextField } from "@mui/material";
import "./RegistrationPage.style.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
const axios = require("axios");
const bcrypt = require('bcryptjs');

export default function Register() {
  let navigate = useNavigate();
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const onNameChange = (e) => setFullName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onDOBChange = (e) => setDateOfBirth(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

   const register = () => {
    axios.post('/register', {
      fullname: fullname,
      email: email,
      dateOfBirth: dateOfBirth,
      password: password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success" 
      });
      navigate('/');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error"
      });
      console.log(err)
    });
  }

  return (
    <div className="main">
      <div className="register-box">
        <Link to={"/"}>
          <img className="Logo" src={logo} alt="logo"></img>
        </Link>

        <div className="register-form">
          <h2>Create Account</h2>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="fullname"
            value={fullname}
            onChange={onNameChange}
            placeholder="Full Name"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="date"
            autoComplete="off"
            name="date"
              value={dateOfBirth}
              onChange={onDOBChange}
            placeholder="Date of birth"
            required
            className="date-filed"
          />
          <br />
          <br />
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
              disabled={ fullname == '' && password == ''}
              onClick={register}
          >
            Create account
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
