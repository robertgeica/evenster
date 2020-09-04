import React from "react";
import image from '../../assets/unnamed.jpg';
import Footer from '../footer/footer'

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

      <Footer/>
    </div>
  );
};

export default Restaurant;
