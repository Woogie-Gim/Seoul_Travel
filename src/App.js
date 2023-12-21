import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import TouristSpot from './components/TouristSpot';
import Festival from './components/Festival';
import FestivalDetail from './components/FestivalDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route path={`${process.env.PUBLIC_URL}/touristspot`} element={<TouristSpot />} />
        <Route path={`${process.env.PUBLIC_URL}/festival`} element={<Festival />} />
        <Route path={`${process.env.PUBLIC_URL}/festival/:id`} element={<FestivalDetail />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;
