import React, { useState, useEffect } from "react";
import "./Banner.css";

const Banner = () => {
  const images = [
    "https://www.bwpremiermarvella.com/storage/r5-4697-copy.jpg",
    "https://www.bwpremiermarvella.com/storage/final-17.jpg",
    "https://www.bwpremiermarvella.com/storage/dji-0203-hdr-copy.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <div className="banner">
        <img src={images[currentIndex]} className="banner-image" alt="Slider" />
      </div>
    </div>
  );
};

export default Banner;
