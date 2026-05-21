// src/App.jsx
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar   from './components/Navbar';
import Landing  from './pages/Landing';
import Quiz     from './pages/Quiz';
import Result   from './pages/Result';
import Gallery  from './pages/Gallery';
import './styles/globals.css';

const App = () => (
  <BrowserRouter>
    {/* Grain texture overlay for luxury feel */}
    <div className="grain-overlay" aria-hidden="true" />

    <Navbar />

    <main>
      <Routes>
        <Route path="/"        element={<Landing />}  />
        <Route path="/quiz"    element={<Quiz />}     />
        <Route path="/result"  element={<Result />}   />
        <Route path="/gallery" element={<Gallery />}  />
        {/* Fallback */}
        <Route path="*"        element={<Landing />}  />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
