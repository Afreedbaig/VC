import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { IconButton, Button, TextField } from "@mui/material";
import Restoreicon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function Homecomponent() {
  let route = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/auth");
    }
  });

  let [meetingcode, setMeetingcode] = useState("");

  const { adduserhistory } = useContext(AuthContext);

  async function handleJVC() {
    await adduserhistory(meetingcode);
    route(`/${meetingcode}`);
  }

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Appi Video Call</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => route("/history")}>
            <Restoreicon />
            <p style={{ fontSize: "20px" }}>History &nbsp;&nbsp;</p>
          </IconButton>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              route("/");
            }}
            variant="contained"
            style={{ margin: "auto" }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Service</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                value={meetingcode}
                onChange={(e) => setMeetingcode(e.target.value)}
                id="outlined-basic"
                label="Meeting code"
              />
              <Button onClick={handleJVC} variant="contained">
                Join
              </Button>
            </div>
            <p>
              write some random gibberish here and after the getting into the VC
              <br />
              share your link with the person you wanna talk to
            </p>
          </div>
        </div>
        <div className="rightPanel">
          <img src="/logo.svg" alt="" />
        </div>
      </div>
    </>
  );
}

export default Homecomponent;
