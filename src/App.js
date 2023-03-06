import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home/Home'
import Decks from './pages/Decks/Decks'
import Deck from './pages/Deck/Deck'

function App() {

  return (
    <>
    <BrowserRouter>
    <AnimatePresence>
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="decks" element={ <Decks/> } />
            <Route path="deck/:id" element={ <Deck/> } />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
    </>
  );
}

export default App;
