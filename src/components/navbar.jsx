import React from "react";
import PropTypes from "prop-types";

const NavBar = (props) => {
  const searchField = React.useRef();
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
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <img
              src={props.homePath}
              style={{ width: 40, height: 35 }}
              onClick={() => props.onHome()}
              alt=""
            />
          </li>
          <li className="nav-item">
            <img
              src={props.favPath}
              style={{ width: 40, height: 35 }}
              onClick={() => props.onFav()}
              alt=""
            />
          </li>
        </ul>
        <div className="div-inline my-2 my-lg-0">
          <input
            ref={searchField}
            name="searchField"
            className="mr-sm-2"
            placeholder="display another capital"
            aria-label="Search"
          />
          <button
            type="button"
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={() => props.onSearch(searchField.current.value)}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  favPath: PropTypes.string,
  homePath: PropTypes.string,
  onHome: PropTypes.func,
  onFav: PropTypes.func,
  onSearch: PropTypes.func,
};

NavBar.defaultProps = {
  favPath: "",
  homePath: "",
  onHome: () => {},
  onFav: () => {},
  onSearch: () => {},
};

export default NavBar;
