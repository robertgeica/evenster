import React from "react";
import image from '../../assets/unnamed.jpg';

import './restaurant.scss'

const Restaurant = () => {
  return (
    <div className='restaurant'>
      <div className="image-landing">
        <img src={image} alt="" className="image" />
      </div>

      <div className="text">
          <h4>Restaurant Name</h4>
          <p>Description</p>
      </div>


    </div>
  );
};

export default Restaurant;
