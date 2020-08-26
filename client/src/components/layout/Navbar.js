import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import logo from '../../assets/logo.png';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="Evenster" />
        </Link>
      </h1>

      <div className="links">
        <Link className="nav-btn" to="/#search">Search</Link>
        {!loading && (
          <Fragment>
            {isAuthenticated ? (
              <Fragment>
                <Link className="nav-btn" to="/posts">Posts</Link>
                <Link className="nav-btn" to="/pubs">Pubs</Link>
                <Link className="nav-btn" onClick={logout} to="/login">
                  Logout
                </Link>
              </Fragment>
            ) : null}
          </Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
