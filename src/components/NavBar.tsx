import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/leaf.svg";
const NavBar = () => {
  return (
    <div className="nav_container">
      <img className="logo_image" src={Logo} alt="Logo_PNG" />
      <Link to="/" className="ui blue button">
        Home
      </Link>
      <Link to="/new" className="ui violet button">
        Add
      </Link>
    </div>
  );
};

export default NavBar;
