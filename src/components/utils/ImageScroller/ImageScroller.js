import React, { useState, useEffect } from "react";
import classes from './ImageScroller.module.css';

const timeInterval = 3000;
const ImageScroller = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, timeInterval);

    return () => clearInterval(interval);
  }, [images.length]);

  const goLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className={`${classes['image-slider-wrapper']} no-top-gap`}>
      {/* Slider image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className={`${classes['image-slider-img']}`}
      />

      {/* Navigation Circles */}
      <div className={`${classes['image-slider-dots']}`}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={`${classes['image-slider-dot']} ${index === currentIndex ? "active" : ''}`} />
        ))}
      </div>

      {/* Left and Right Buttons - Only visible on desktop */}
      {!isMobile && (
        <div className={`${classes['image-slider-nav']}`}>
          <div className={`${classes['container']} container`}>
            <button onClick={goLeft} className={`${classes['prev-button']}`}>&#10094;</button>
            <button onClick={goRight} className={`${classes['next-button']}`}>&#10095;</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageScroller;
