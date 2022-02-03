import React, { useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Componenets/NavBar/NavBar.component";
import "./HomePage.style.css";
import party from "party-js";
import useSound from "use-sound";
// import { Boom } from '@hapi/boom';

function Home() {
  // const [play] = useSound(Boom);
  const ref = useRef([]);
  const balloons = [
    { id: 1, color: "#2a68a9", text: "Just" },
    { id: 2, color: "#2a68a9", text: "Married" },
  ];
  function confetti(id, color) {
    // play();

    party.confetti(ref.current[id], {
      count: party.variation.range(90, 100),
      size: party.variation.range(1.0, 1.4),
      color: party.Color.fromHex(color),
    });

    ref.current[id].style.animation = "explode 100ms forwards";
  }

  return (
    <div className="Body">
      <NavBar />
      <div className="Main">
        <div className="Egg">
          <div className="text-title">
            <h2>Need a Reliable Buddy?</h2>
            <h4>
              No matter what is your circumstances, you can always join or
              create your money circle to fulfill any upcoming needs.
            </h4>
            <h3 className="text-center">Be Prepared</h3>
            <Link className="create-account-link" to={"/register"}>
              Create account
            </Link>
          </div>
        </div>
        <div className="Box-1">
          <div class="balloon">
            {balloons.map((balloon) => (
              <div
                onClick={() => confetti(balloon.id, balloon.color)}
                ref={(el) => (ref.current[balloon.id] = el)}
                key={balloon.id}
              >
                <span>{balloon.text}</span>
              </div>
            ))}
          </div>
          <div className="card-1">
            <h3>You can save for your dream wedding</h3>
            <div className="wedding-image"></div>
          </div>
        </div>
        <div className="between-text"><h1>OR</h1></div>
        <div className="Box-2">
          <div className="arrows">
        <div className="arrow-1"></div>
            <div className="arrow-1"></div>
            </div>
          <div className="card-2">
            <h3>You can save for your dream business</h3>
            <div className="business-image"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
