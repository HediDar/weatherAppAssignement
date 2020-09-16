import React from "react";

import { Link } from "react-router-dom";
const NavBarHome = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <h4 className="nav-links">
          <Link to="/">Home</Link>
        </h4>
      </div>
    </nav>
  );
};




export default NavBarHome;
