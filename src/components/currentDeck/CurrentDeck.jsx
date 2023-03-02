import React, { useState } from 'react'
import { AppConsumer } from '../../contexts/deckContext'
import './currentdeck.css'
import { motion } from 'framer-motion'
import { AiFillCloseSquare } from 'react-icons/ai'

function CurrentDeck({showDeck}) {

    const {deck, setDeck} = AppConsumer()
    const {side, setSide} = AppConsumer()

    const removeFromDeck = (amount, index) => {
      const updatedDeck = [...deck];
      const card = updatedDeck[index];
    
      if (amount === 4) {
        updatedDeck.splice(index, 1);
        setDeck(updatedDeck);
      }
    
      if (amount === 1) {
        card.amount = card.amount - 1;
    
        if (card.amount === 0) {
          updatedDeck.splice(index, 1);
        }
    
        setDeck(updatedDeck);
      }
    };

    const removeFromSide = (amount, index) => {
      const updatedSide = [...side];
      const card = updatedSide[index];
    
      if (amount === 4) {
        updatedSide.splice(index, 1);
        setSide(updatedSide);
      }
    
      if (amount === 1) {
        card.amount = card.amount - 1;
    
        if (card.amount === 0) {
          updatedSide.splice(index, 1);
        }
    
        setSide(updatedSide);
      }
    };
    

  return (
    <motion.div initial={{x: 100}} animate={{ x: 0 }} transition={{ duration: 0.4 }} className="deck-container">
        <div className="modal-header">
          <AiFillCloseSquare onClick={showDeck} className='close-btn' />
        </div>
        <p className="deck-sub">Mainboard</p>
        {deck.map((card, index) => (
              <div index={index} className="card-prev">
                <p className='amount'>{card.amount}</p>
                <p>{card.name}</p>
                <div className="controls">
                  <button className="remove-one" onClick={(e) => removeFromDeck(1, index)}>-1</button>
                  <button className="remove-four" onClick={(e) => removeFromDeck(4, index)}>-4</button>
                </div>
              </div>
          ))}


        <p className="deck-sub-s">Sideboard</p>
        {side.map((card, index) => (
              <div index={index} className="card-prev-s">
                <p className='amount'>{card.amount}</p>
                <p>{card.name}</p>
                <div className="controls">
                  <button className="remove-one-s" onClick={(e) => removeFromSide(1, index)}>-1</button>
                  <button className="remove-four-s" onClick={(e) => removeFromSide(4, index)}>-4</button>
                </div>
              </div>
          ))}
    </motion.div>
  )
}

export default CurrentDeck
