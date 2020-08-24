import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./carousel.scss";

import Unnamed from "../../assets/unnamed.jpg";

const Slider = () => {
  return (
    <Carousel>
      <div>
        <img src={Unnamed} />
      </div>
      <div>
        <img src={Unnamed} />
      </div>
      <div>
        <img src={Unnamed} />
      </div>
    </Carousel>
  );
};

export default Slider;
