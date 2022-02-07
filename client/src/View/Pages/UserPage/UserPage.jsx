import React, { useEffect, useState } from "react";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./UserPage.style.css";
import jwt_decode from "jwt-decode";
import NavBar from "../../Components/NavBar/NavBar.component";
import swal from "sweetalert";
const axios = require("axios");

export default function UserAccount() {
  let navigate = useNavigate();
  let [token, setToken] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [role, setRole] = useState("");
  const onAmountChange = (e) => setAmount(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPeriodChange = (e) => setPeriod(e.target.value);
  const onRoleChange = (e) => setRole(e.target.value);
  let monthlySettlement =  Math.ceil(amount/period);
  const [moneyCircle, setMoneyCircle] = useState([]);

  useEffect(() => {
    token = localStorage.getItem("token");
    navigate("/user");
    getUser();
    getAllMoneyCircles();
    monthlySettlementSetter();
  }, []);

  const logOut = () => {
    localStorage.setItem("token", null);
    navigate("/");
  };

  const getUser = () => {
    token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserName(decoded.user);
    setUserId(decoded.id);
  };
 

  const createMoneyCircle = () => {
    axios
      .post("http://localhost:8000/user", {
        creator: email,
        amount: amount,
        period: period,
        monthlySettlement: monthlySettlement,
        role: role,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
        });
        navigate("/user");
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
        });
        console.log(err);
      });
  };

  const roleSelection = () => {
    const rolesArray = [];
    for (let i = 1; i <= period; i++) {
      rolesArray.push(i);
    }
    return rolesArray.map((el) => {
      return (
        <MenuItem key={el} value={el}>
          {el}
        </MenuItem>
      );
    });
  };

  const moneyCircleList = () => {
    return moneyCircle.map((el) => {
      return (
        <div key={el._id}>
          <p>{`the amount is ${el.amount}, monthly settlement is ${el.monthlySettlement}`}</p>
          <button>Join</button>
        </div>
      );
    });
  };

  function monthlySettlementSetter(){
  if(monthlySettlement === NaN) {
    return true
  } else {
    return false
  }
  }
 
  

  const getAllMoneyCircles = () => {
    axios
      .get("http://localhost:8000/user")
      .then((res) => setMoneyCircle(res.data))
      .catch((error) => console.log("There was an issue: ", error));
  };

  {
    return (
      <div>
        <NavBar />
        <div className="account-main">
          <div className="Greeting">
            <Button
              className="button_style"
              variant="contained"
              size="small"
              onClick={logOut}
            >
              Log Out
            </Button>
            <h1>{`Welcome ${userName} ${userId}`}</h1>
          </div>
          <div className="user-account">
            <div className="create-moneyCircle">
              <h1>Create your money circle</h1>

              <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="amount"
                value={amount}
                onChange={onAmountChange}
                placeholder="Amount"
                required
              />
              <br />
              <br />
              <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="period"
                value={period}
                onChange={onPeriodChange}
                placeholder="Period in months"
                required
              />
              <br />
              <br />
              {
                isNaN(monthlySettlement) ?
              <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="monthlySettlement"
                value='Monthly settlement'
                placeholder="Monthly settlement"
                required
                disabled 
              /> :
              <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="monthlySettlement"
              value={monthlySettlement}
              placeholder="Monthly settlement"
              required
              disabled 
            /> 

            }
              <br />
              <br />
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={onRoleChange}
              >
                {roleSelection()}
              </Select>
              <br />
              <br />
              <TextField
                id="standard-basic"
                type="email"
                autoComplete="off"
                name="email"
                value={email}
                onChange={onEmailChange}
                placeholder="Please confirm your Email address"
                required
              />
               <br />
              <br />
              <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                // disabled={ fullname == '' && password == ''}
                onClick={createMoneyCircle}
              >
                Create account
              </Button>
            </div>
            <div className="moneyCircles-list">
              <h1>Join money circle</h1>
              {moneyCircleList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
