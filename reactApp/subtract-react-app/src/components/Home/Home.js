import React, { useEffect, useState } from "react";
import Login from "../Authentication/Login";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const handleLoginClick = () => {
    console.log("Login clicked!");
    return <Login />;
  };
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  console.log(isAuthenticated);
  return (
    <>
      <div>Welcome {isAuthenticated && user.name} to SubTrack</div>
      {!isAuthenticated && <button onClick={handleLoginClick}>Login</button>}

      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </>
  );
};

export default Home;
