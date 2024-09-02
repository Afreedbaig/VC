import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="LandingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Appi video call</h2>
        </div>
        <div className="navlist">
          <p onClick={() => navigate(`/${uuidv4()}`)}>Join as Guest</p>
          <p onClick={() => navigate(`/auth`)}>Register</p>
          <div onClick={() => navigate(`/auth`)} role="button">
            Login
          </div>
        </div>
      </nav>

      <div className="LandingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            Ones
          </h1>
          <p style={{ textAlign: "center" }}>
            Cover distance by appi video call
          </p>
          <div role="button" style={{ display: "flex" }}>
            <Link to="/auth">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
