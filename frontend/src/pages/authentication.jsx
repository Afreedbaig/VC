import React, { useContext, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";

export default function Authentication() {

  const navigate = useNavigate();
  if(localStorage.getItem("token")){
  navigate("/home");
  }
  
  // const [error, seterror] = useState("");
  const [messages, setMessages] = useState("");
  const [open, setOpen] = useState(false);

  // const navigate = useNavigate();
  let [inputs, setinputs] = useState({ name: "", username: "", password: "" });

  let [action, setaction] = useState("Sign Up");

  const { handleRegister, handleLogin } = useContext(AuthContext);

  const HandleLogSign = async (e) => {
    if (action === e.target.innerText) {
      try {
        if (action[0] === "S") {
          let result = await handleRegister(
            inputs.name,
            inputs.username,
            inputs.password
          );
          setMessages(() => result);
          setOpen(true);
        } else {
          let result = await handleLogin(inputs.username, inputs.password);
          // console.log(result);
          setMessages(() => result);
          setOpen(true);
        }
      } catch (err) {
        setMessages(() => err.response.data.message);
        setOpen(true);
      }
    } else {
      setaction(() => e.target.innerText);
    }
  };

  const Handlechange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="Auth">
      <div className="Authcontainer">
        <div className="Authheader">
          <div className="Authtext">{action}</div>
          <div className="Authunderline"></div>
        </div>
        <div className="Authinputs">
          {action === "Login" ? (
            <div />
          ) : (
            <div className="Authinput">
              {/* <img src="" alt="" /> */}
              <span>Name&nbsp;&nbsp;: &nbsp;</span>
              <input
                name="name"
                type="text"
                onChange={Handlechange}
                placeholder="Name"
                value={inputs.name}
              />
            </div>
          )}

          <div className="Authinput">
            {/* <img src="" alt="" /> */}
            <span>Username&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input
              name="username"
              type="text"
              onChange={Handlechange}
              placeholder="Username"
              value={inputs.username}
            />
          </div>
          <div className="Authinput">
            {/* <img src="" alt="" /> */}
            <span>Password&nbsp;: &nbsp;</span>
            <input
              name="password"
              type="password"
              onChange={Handlechange}
              placeholder="Password"
              value={inputs.password}
            />
          </div>
        </div>

        <div className="Authsubmit-container">
          <div
            className={
              action === "Login" ? "Authsubmit Authgray" : "Authsubmit"
            }
            onClick={HandleLogSign}
          >
            Sign Up
          </div>
          <div
            className={
              action === "Sign Up" ? "Authsubmit Authgray" : "Authsubmit"
            }
            onClick={HandleLogSign}
          >
            Login
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={messages}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
