import React, { Fragment } from "react";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./homepage.scss";

import SearchBar from "../search-bar/search-bar";
import Carousel from '../carosel/carousel';
import Footer from '../footer/footer';

const Homepage = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <div>
      
	  <Carousel/>
	  <SearchBar/>
	  <Footer/>
		

    </div>
  );
};

Homepage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Homepage);
