import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Fade } from 'react-awesome-reveal';
import '../css/Home.css';

function Home() {
  const frames = useRef([]);
  const totalFrames = 314;
  const [loading, setLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

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
      setScrollPosition(window.scrollY);
    }
  }, [totalFrames, loading]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    window.addEventListener('scroll', handleScroll);
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, [handleScroll]);

  const calculateAnimationOffset = () => {
    const maxOffset = 100;
    const speed = 0.2;
    return Math.min(maxOffset, scrollPosition * speed);
  };

  const calculateImageOpacity = () => {
    const fadeStart = document.body.scrollHeight - window.innerHeight - 200;
    const fadeEnd = document.body.scrollHeight - window.innerHeight - 100;
    const opacity = Math.max(0, 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart));
    return opacity;
  };

  const handleFestivalButtonClick = () => {
    window.location.href = '/festival';
  };

  const handleTouristSpotButtonClick = () => {
    window.location.href = '/touristspot';
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading ? (
        <div className="loading-screen">
          <img src="./images/1.jpg" alt="loading" />
        </div>
      ) : (
        <>
          <div className="frame-container" style={{ transform: `translateY(${calculateAnimationOffset()}px)`, opacity: calculateImageOpacity() }}>
            <img
              src={frames.current[currentFrame].src}
              alt="frame"
            />
          </div>
          <Fade>
            <h1 className="main-msg">
              Seoul
            </h1>
          </Fade>
          <div className="current-time">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="city-name">
            Seoul
          </div>
        </>
      )}
      <div class="scroll-section">
        <Fade direction="left">
          <p className="description">
            <strong>서울</strong>
            은 아름다운 역사와 현대가 공존하는 도시로, 독특한 매력과 다양한 경험을 제공합니다.<br></br>
            600년 이상의 역사를 자랑하는 고궁들과 전통 시장에서 현대적인 상업지구까지 다양한 얼굴을 갖추고 있어요. 한국 전통 문화의 중심지인 경복궁과 창덕궁은 아름다운 건축물과 정원이 눈에 띄며, 서울의 역사적인 흔적을 만날 수 있어요.
            이 도시는 높은 현대화 수준에도 불구하고 전통을 소중히 여기는 문화의 중심지이기도 합니다. 한류 열풍의 중심지로서 K-팝, 드라마, 영화 등이 전 세계에 파급력을 미치고 있어, 예술과 엔터테인먼트의 중심지로 손꼽히고 있어요.
            또한, 서울은 다양한 음식 문화로 유명합니다. 한국 전통음식부터 글로벌한 다양한 음식까지 맛있는 음식을 즐길 수 있어요. 한국의 다양성을 느낄 수 있는 동네들과 독특한 카페, 상점들도 매력적인 서울의 일부입니다.
            매일이 새롭게 변화하는 도시의 모습과 과거와 현재가 공존하는 서울은 여행자들에게 특별한 경험을 선사하는 곳입니다.
          </p>
        </Fade>
      </div>

      <Fade>
        <div className="button-container">
          <button className="button" onClick={handleFestivalButtonClick}>
            <h1>축제</h1>
          </button>
          <button className="button travel" onClick={handleTouristSpotButtonClick}>
            <h1>관광지</h1>
          </button>
        </div>
      </Fade>

    </div>
  );
}

export default Home;
