import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import "./Login.css";
import loginimg from "../../images/login/image.png";
import frame from "../../images/login/Frame 4409.png";
const Login = () => {
  const { loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {});

  const getHandleLogin = async () => {
    await loginWithRedirect();
  };

  const gethandleLabelClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div>
        <h2>SUBTrack Login</h2>
        <button onClick={getHandleLogin}>Login</button>
        <br></br>
        <label
          onClick={gethandleLabelClick}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Please signup here
        </label>
      </div>
      <div className="login-img">
        {/* <img src={loginimg} id="loginimg"></img> */}
        <div className="login-frame">
          <img src={frame} />
        </div>
      </div>
    </div>
  );
};

export default Login;
