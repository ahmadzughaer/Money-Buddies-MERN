import React, { useEffect, useState } from "react";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
import "./UserPage.style.css";
import jwt_decode from "jwt-decode";
import NavBar from "../../Components/NavBar/NavBar.component";
import swal from "sweetalert";

const axios = require("axios");

export default function UserAccount() {
  // inputs style
  const useStyles = makeStyles({
    input: {
      "& input": {
        color: "white",
      },
    },
    input3: {
      "& input": {
        color: "#83A7CD",
      },
    },
  });

  let navigate = useNavigate();
  let [userName, setUserName] = useState("");
  let [userId, setUserId] = useState("");
  let [userMoneyCircle, setUserMoneyCircle] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [role, setRole] = useState("");
  const [circleId, setCircleId] = useState("")
  const onAmountChange = (e) => setAmount(e.target.value);
  const onPeriodChange = (e) => setPeriod(e.target.value);
  const onRoleChange = (e) => setRole(e.target.value);
  let monthlySettlement = Math.ceil(amount / period);
  const [moneyCircle, setMoneyCircle] = useState([]);
  const [joinBtn, setJoinBtn] = useState(false);
  let remainingPlaces = [];
  let remainingPlacesArray;

  const classes = useStyles();
  let token = localStorage.getItem("token");

  useEffect(() => {
    token = localStorage.getItem("token");
    navigate("/users");
    getUser();
    getAllMoneyCircles();
    monthlySettlementSetter();
  }, []);

  // get user data from the token
  const getUser = () => {
    token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    setUserName(decodedToken.user);
    setUserId(decodedToken.id);
    setUserMoneyCircle(decodedToken.moneyCircles);
  };

  // add money circle to database
  const createMoneyCircle = () => {
    axios
      .post("https://money-buddies.herokuapp.com/user", {
        creator: userId,
        amount: amount,
        period: period,
        monthlySettlement: monthlySettlement,
        role: role,
        remainingPlaces: remainingPlacesArray,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
        });
        setTimeout((window.location = "/users"), 3000);
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
        });
        console.log(err);
      });
  };

  // update money circle participants

  const updateMoneyCircleParticipants = (moneyCircleId, participantId) => {
    if (moneyCircleId === circleId) {
      axios
        .post("http://localhost:8000/user/moneycircle", {
          participants: participantId,
          moneyCircleId: moneyCircleId,
        })
        .then((res) => {
          swal({
            text: res.data.title,
            icon: "success",
          });
          setTimeout((window.location = "/user"), 3000);
        })
        .catch((err) => {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
          });
          console.log(err);
        });
    }
  }; // needs to be fixed

  // generate roles array
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

  const createRemainingPlacesArray = () => {
    for (let i = 1; i <= period; i++) {
      remainingPlaces.push(i);
    }
    remainingPlacesArray = remainingPlaces.filter((el) => el !== role);
    return remainingPlacesArray;
  };
  createRemainingPlacesArray();

  // on click on Join button
  const handleClick = (e) => {
    setCircleId(e.target.dataset.set);
    console.log(userId)
    updateMoneyCircleParticipants(circleId, userId);
  };

  const getAllParticipants = () => {
    if (moneyCircle.length > 0) {
      let joinedMoneyCircle
      const participantArray = moneyCircle.map((el) => el.participants);
      return (joinedMoneyCircle = participantArray[0].find(
        (el) => el === userId
      ));
    } else {
      return;
    }
  };
  getAllParticipants();

  // const handleClick = () => {
  //   setJoinBtn(true);
  //   swal({
  //     text: "Joined successfully",
  //     icon: "success",
  //   });
  // };

  // render all the money circles
  const moneyCircleList = () => {
    if (moneyCircle.length > 0) {
      return moneyCircle.map((el) => {
        return (
          <div key={el._id} className="moneyCircle">
            <p>
              {`Total amount is ${el.amount}`}&#8362; ,
              {`with ${el.monthlySettlement}`}&#8362;
              {` as a monthly settlement and the available places are [${el.remainingPlaces}]`}
            </p>
            {userId === el.creator ? (
              <p className="alreadyJoined-text">
                You have created this money Circle
              </p>
            ) : joinBtn ? (
              <p className="alreadyJoined-text">Joined</p>
            ) : (
              <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                data-set={el._id}
                onClick={handleClick}
              >
                Join
              </Button>
            )}
          </div>
        );
      });
    } else {
      return (
        <div className="moneyCircle">
          <h1>
            Oops! There is no money circle yet, do you want to create one ?
          </h1>
          <FontAwesomeIcon className="arrow2" size="5x" icon={faArrowLeft} />
        </div>
      );
    }
  };

  function monthlySettlementSetter() {
    if (monthlySettlement === NaN) {
      return true;
    } else {
      return false;
    }
  }

  // get all the money circles from database
  const getAllMoneyCircles = () => {
    axios
      .get("https://money-buddies.herokuapp.com/user")
      .then((res) => setMoneyCircle(res.data))
      .catch((error) => console.log("There was an issue: ", error));
  };

  {
    return (
      <div>
        <NavBar />

        <div className="account-main">
          <div className="Greeting">
            <h1>{`Welcome ${userName}`}</h1>
          </div>
          <div className="user-account">
            {userMoneyCircle.length < 1 ? (
              <div className="create-moneyCircle">
                <h1>Create your money circle</h1>

                <TextField
                  id="standard-basic"
                  type="text"
                  autoComplete="off"
                  className={classes.input}
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
                  className={classes.input}
                  value={period}
                  onChange={onPeriodChange}
                  placeholder="Period in months"
                  required
                />
                <br />
                <br />
                {isNaN(monthlySettlement) ? (
                  <TextField
                    className={classes.input3}
                    id="standard-basic"
                    type="text"
                    autoComplete="off"
                    name="monthlySettlement"
                    value="Monthly settlement"
                    placeholder="Monthly settlement"
                    required
                  />
                ) : (
                  <TextField
                    className={classes.input3}
                    id="standard-basic"
                    type="text"
                    autoComplete="off"
                    name="monthlySettlement"
                    value={monthlySettlement}
                    placeholder="Monthly settlement"
                    required
                  />
                )}
                <br />
                <br />
                <div className="roles-box">
                  <InputLabel
                    className="input-label"
                    id="demo-simple-select-helper-label"
                  >
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={onRoleChange}
                  >
                    {roleSelection()}
                  </Select>
                </div>
                <br />
                <Button
                  className="button_style"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={createMoneyCircle}
                >
                  Create Money Circle
                </Button>
              </div>
            ) : (
              <div className="already-create-moneyCircle">
                <h1>
                  You can only create one money circle, you can join another
                  money circle or wait until this to end
                </h1>
              </div>
            )}
            <div className="moneyCircle-section">
              <h1>Join money circle</h1>
              <div className="moneyCircles-list">{moneyCircleList()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
