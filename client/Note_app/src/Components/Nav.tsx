import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api"; // Adjust the import path as necessary

const Nav = ({ isAuth }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logoutUser();
    console.log("Logout response:", response);
    window.location.reload();
    navigate("/login"); // Redirect to login after logout
  };
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__brand">
          Note App
        </Link>

        <ul className="nav__links">
          {isAuth ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button className="nav__button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
