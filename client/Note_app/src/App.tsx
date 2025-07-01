import React from "react";
import { BrowserRouter, isCookie, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import "./App.css"; // Assuming you have some global styles
import Cookies from "js-cookie"; // Make sure to install js-cookie package
import { useEffect } from "react";

const App = () => {
  const [isAuth, setIsAuth] = React.useState(false);

  useEffect(() => {
    const token = Cookies.get("token"); // from cookie
    const user = sessionStorage.getItem("user"); // from session
    setIsAuth(!!token || !!user);
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Nav isAuth={isAuth} />
        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
