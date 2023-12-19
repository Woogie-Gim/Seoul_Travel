import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import TouristSpot from './components/TouristSpot';
import Festival from './components/Festival';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route path={`${process.env.PUBLIC_URL}/touristspot`} element={<TouristSpot />} />
        <Route path={`${process.env.PUBLIC_URL}/festival`} element={<Festival />} />
      </Routes>
    </Router>
  );
}

export default App;
