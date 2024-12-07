import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import Login from "./components/Authentication/Login";
import Logout from "./components/Authentication/Logout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Authentication/Register";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
