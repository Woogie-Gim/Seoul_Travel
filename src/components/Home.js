import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const frames = useRef([]);
  const totalFrames = 314;
  const [loading, setLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const loadImageFrames = async () => {
      const promises = [];

      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const promise = new Promise((resolve) => {
          img.onload = resolve;
        });

        img.src = `./images/${i}.jpg`;
        frames.current.push(img);
        promises.push(promise);
      }

      await Promise.all(promises);
      setLoading(false);
    };

    loadImageFrames();
  }, [totalFrames]);

  const handleScroll = useCallback(() => {
    if (!loading) {
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const frameIndex = Math.round(scrollPercentage * (totalFrames - 1) * 0.2);

      setCurrentFrame(frameIndex);
    }
  }, [totalFrames, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <header>
        <nav className="global-nav">
          <div className="global-nav-links">
            <a href="#section" className="product-name">
              서울 여행
            </a>
            <Link to="/touristspot">관광명소</Link>
            <Link to="/festival">축제</Link>
          </div>
        </nav>
      </header>

      {loading ? (
        <div className="loading-screen">
          <img src="./images/1.jpg" alt="loading" />
        </div>
      ) : (
        <img
          src={frames.current[currentFrame].src}
          alt="frame"
          className="frame-container responsive-image"
        />
      )}
    </div>
  );
}

export default Home;