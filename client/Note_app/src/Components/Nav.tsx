import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const isAuthenticated = false; // Replace with actual auth logic

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__brand">
          Note App
        </Link>

        <ul className="nav__links">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button className="nav__button">Logout</button>
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
