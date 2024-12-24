import React, { useEffect, useState } from "react";
import Login from "../Authentication/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import titleimg from "../images/title.png";
import "./Home.css";
import what from "../images/What makes us unique_.png";
import what1 from "../images/whatgroup/Group 282236.png";
import what2 from "../images/whatgroup/Group 282300.png";
import what3 from "../images/whatgroup/Group 282299.png";

import content1 from "../images/choose/content.png";
import content1img from "../images/choose/Frame 8699.png";

import manage from "../images/manage/Frame 2.png";
import manageimg from "../images/manage/Group 282245.png";

import testimg from "../images/testimo/image.png";
import testquote from "../images/testimo/quote.png";

import footer from "../images/Future space.png";
import message from "../images/Group 50.png";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const handleLoginClick = () => {
    console.log("Login clicked!");
    navigate("/login");
  };
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  if (isAuthenticated) {
    console.log("userid:", user.sub);
  }
  console.log(isAuthenticated);
  return (
    <div className="home-page-container">
      {/* <div>Welcome {isAuthenticated && user.name} to SubTrack</div>
      {!isAuthenticated && <button onClick={handleLoginClick}>Login</button>}

      {isAuthenticated && <button onClick={handleLogout}>Logout</button>} */}
      <div className="homepage">
        <img
          id="logo-img"
          src={titleimg}
          alt="SubTrack"
          style={{ width: "100%" }}
        ></img>
        <div className="home-content">
          <div className="what-group">
            {/* <div className="mess">
              {" "}
              <img src={message}></img>
            </div> */}
            <div className="what-text"> What makes us unique?</div>
            <div className="what-features">
              <img src={what1}></img>
              <img src={what2}></img>
              <img src={what3}></img>
            </div>
          </div>
          <div className="choose-group">
            <div className="cg-img">
              <img src={content1img}></img>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className="content1">
              <img src={content1}></img>
            </div>
          </div>
          <div className="manage-group">
            <div className="mgcontent">
              <img src={manage}></img>
            </div>
            <div className="mgimg">
              <img src={manageimg}></img>
            </div>
          </div>
          <div className="testimonial">
            <div className="testname">Testimonials</div>
            <div className="test-group">
              <div className="testimg">
                <img src={testimg}></img>
              </div>
              <div className="testquote">
                <img
                  src={testquote}
                  alt="I really cannot say thank you enough to the blackscholars community. Fantastic and wonderful! It is the bridge for the students of financial in need to have the opportunity to go ahead. "
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <img src={footer}></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
