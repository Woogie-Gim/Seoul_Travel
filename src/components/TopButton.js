import React, { useState, useEffect } from 'react';
import '../css/TopButton.css';

function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 300;

      setIsVisible(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <img src="./images/topbutton.jpg" alt="Top Button" />
    </div>
  );
}

export default TopButton;
