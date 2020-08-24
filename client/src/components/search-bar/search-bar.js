import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import RestaurantCard from './restaurant-card/restaurant-card';
import image from '../../assets/unnamed.jpg'

import "./search-bar.scss";

const SearchBar = () => {
  return (
    <div className='restaurants'>
      <form className="search-bar">
        <div className="input-container">
          <label htmlFor="search">Looking For</label>
          <input name="search" type="text" />
        </div>

        <div className="input-container">
          <label htmlFor="search">City</label>
          <input name="search" type="text" />
        </div>

        <div className="input-container">
          <label htmlFor="search">When</label>
          <input name="search" type="text" />
        </div>

        <button className="button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <h2>Active</h2>
        <div>
            <RestaurantCard image={image}/>
        </div>
    </div>
  );
};

export default SearchBar;
