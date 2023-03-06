import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home/Home'
import Decks from './pages/Decks/Decks'

function App() {

  return (
    <>
    <BrowserRouter>
    <AnimatePresence>
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="decks" element={ <Decks/> } />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
    </>
  );
}

export default App;
