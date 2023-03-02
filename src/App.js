import './App.css';
import React from 'react';
import Search from './components/search/Search';
import Header from './components/header/Header';
import Background from './components/background/Background';
import { AnimatePresence } from 'framer-motion'

function App() {

  return (
    <>
    <AnimatePresence>
      <Background />
      <Header />
      <Search />
    </AnimatePresence>
    </>
  );
}

export default App;
