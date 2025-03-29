import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import MainCrosel from "../HomePageCarousel/MainCarousel.jsx";
import ProductSlider from "../ProductSlider/ProductSlider";
import ProductCategory from "../ProductCategory/ProductCategory";

import { CustomizedFrames } from "../../../Data/frames.js";
import { acrylics } from "../../../Data/acrylics.js";

const HomePage = () => {
  const location = useLocation();
  const isViewAllPage = location.pathname === "/view-all";
  
  // Add smooth scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <div className="pb-14">
      {!isViewAllPage && <MainCrosel className="-z-10" />}
      <ProductSlider data={acrylics} category="acrylics" />
      <ProductCategory />
      {/* <ProductSlider data={CustomizedFrames} category="CustomizedFrames" /> */}
    </div>
  );
};

export default HomePage;