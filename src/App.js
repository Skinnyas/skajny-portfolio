import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-mne" element={<About />} />
          <Route path="/sluzby" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
