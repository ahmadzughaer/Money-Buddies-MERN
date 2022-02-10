import React from "react";
import "./AboutPage.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../../Components/NavBar/NavBar.component";
export default function AboutPage() {
  {
    return (
      <div className="about-main">
        <NavBar />
        <div className="about-box">
          <div className="about-text">
            <h1>What is MoneyBuddies?</h1>
            <h3 className="about-paragraph">
              It is an App enable Peers to create money circles between each
              others. Any user with an active bank account and monthly income
              can register to the app
            </h3>

            <h1 className="moneyCircle-text">What is money circles?</h1>
            <div className="explanation-box">
              <p>here the explanation </p>
              <FontAwesomeIcon className="arrow" size="5x" icon={faArrowRight} />
            </div>
          </div>
          <div className="about-image"></div>
        </div>
      </div>
    );
  }
}
