import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "https://vc-ug56.onrender.com/users",
});

export const AuthProvider = ({ children }) => {
  const router = useNavigate();
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState(authContext);

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };
  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password,
      });

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      } else {
        return request.data.messgae;
      }
    } catch (err) {
      throw err;
    }
  };

  const getuserhistory = async () => {
    try {
      let request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  };

  const adduserhistory = async (meet) => {
    try {
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meet,
      });
      return request;
    } catch (e) {
      console.log(e);
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    adduserhistory,
    getuserhistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
