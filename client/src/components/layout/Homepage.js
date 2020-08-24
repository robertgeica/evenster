import React, { Fragment } from "react";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./homepage.scss";

import image from "../../assets/unnamed.jpg";
import SearchBar from "../search-bar/search-bar";

const Homepage = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <div>
      <div className="image-landing">
        <img src={image} alt="" className="image" />
      </div>

	  <SearchBar/>

	  
    </div>
  );
};

Homepage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Homepage);
