import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import "./Login.css";

const Login = () => {
  const { loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
  });

  const getHandleLogin = async () => {
    await loginWithRedirect();
  };

  const gethandleLabelClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>SubTrack Login</h2>
      <button onClick={getHandleLogin}>Login</button>
      <br></br>
      <label
        onClick={gethandleLabelClick}
        style={{ cursor: "pointer", color: "blue" }}
      >
        Please signup here
      </label>
    </div>
  );
};

export default Login;
