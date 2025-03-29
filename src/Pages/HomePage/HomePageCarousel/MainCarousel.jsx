import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCrousalData } from "./MainCarouselData";
import "./MainCarousel.css";

const items = MainCrousalData.map((item, index) => (
  <img 
    key={index}
    className="object-cover w-full h-full" 
    src={item.image} 
    alt={item.alt || `Slide ${index + 1}`} 
  />
));

const MainCrosel = () => (
  <div>
    <div className="MainCrosel">
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        animationDuration={1500}
        infinite
        mouseTracking
        responsive={{
          0: { items: 1 },
        }}
      />
    </div>
  </div>
);

export default MainCrosel;