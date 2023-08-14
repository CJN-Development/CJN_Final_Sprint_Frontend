import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../images/Game1.avif';
import image2 from '../../images/Game56.avif';
import image3 from '../../images/Game6.avif'; 

const GameCarousel = () => {
  return (
    <Carousel>
    <Carousel.Item interval={2000}>
      <img src={image1}></img>
    </Carousel.Item>
    <Carousel.Item interval={1000}>
    <img src={image2}></img>
    </Carousel.Item>
    <Carousel.Item interval={1000}>
    <img src={image3}></img>
    </Carousel.Item>


   
  </Carousel>
  )
}

export default GameCarousel