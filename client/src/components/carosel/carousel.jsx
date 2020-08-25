import React from 'react';
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './carousel.scss'

import image from "../../assets/unnamed.jpg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
 
const Carousel = () =>{

    return (
      <CarouselProvider
      
        naturalSlideWidth={100}
        naturalSlideHeight={50}
        totalSlides={3}
        isPlaying={true}
        interval={5000}
      >
        <Slider className='carousel'>
          <Slide index={0}><Image src={image} /></Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
        </Slider>
        <ButtonBack className='carousel-button'><FontAwesomeIcon icon={faAngleLeft} /></ButtonBack>
        <ButtonNext className='carousel-button'><FontAwesomeIcon icon={faAngleRight} /></ButtonNext>
      </CarouselProvider>
    );
}

export default Carousel;