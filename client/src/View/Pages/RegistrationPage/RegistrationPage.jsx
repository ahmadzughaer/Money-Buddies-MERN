import React, { useState } from "react";
// import swal from 'sweetalert';
import { Button, TextField } from "@mui/material";
import "./RegistrationPage.style.css";
import { Link } from "react-router-dom";

import logo from "../../Assets/images/logo.png";

// import { useNavigate } from 'react-router-dom';
// const axios = require('axios');
// const bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);

export default function Register() {
  //   let navigate = useNavigate();

  //   const [username, setUserName] = useState('');
  //   const [password, setPassword] = useState('');

  //   const onNameChange = (e) => setUserName(e.target.value);
  //   const onPasswordChange = (e) => setPassword(e.target.value);

  //   const login = () => {
  //     const pwd = bcrypt.hashSync(password, salt);
  //     console.log('')

  //     axios.post('http://localhost:2000/login', {
  //       username: username,
  //       password: pwd,
  //     }).then((res) => {
  //       localStorage.setItem('token', res.data.token);
  //       localStorage.setItem('user_id', res.data.id);
  //       navigate('/dashboard');

  //     }).catch((err) => {
  //       if (err.response && err.response.data && err.response.data.errorMessage) {
  //         swal({
  //           text: err.response.data.errorMessage,
  //           icon: "error",
  //           type: "error"
  //         });
  //       }
  //     });
  //   }

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
            //   value={username}
            //   onChange={onNameChange}
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
            //   value={username}
            //   onChange={onNameChange}
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
            //   value={username}
            //   onChange={onNameChange}
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
            //   value={password}
            //   onChange={onPasswordChange}
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
            //   disabled={username == '' && password == ''}
            //   onClick={login}
          >
            Create account
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
