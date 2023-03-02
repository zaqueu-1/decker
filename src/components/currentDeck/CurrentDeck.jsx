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
    
      card.amount = card.amount - amount;
    
        if (card.amount <= 0) {
          updatedDeck.splice(index, 1);
        }
    
      setDeck(updatedDeck);
      localStorage.setItem('deck', JSON.stringify(updatedDeck));
    };

    const removeFromSide = (amount, index) => {
      const updatedSide = [...side];
      const card = updatedSide[index];

      card.amount = card.amount - amount;
    
        if (card.amount <= 0) {
          updatedSide.splice(index, 1);
        }
    
      setSide(updatedSide);
      localStorage.setItem('side', JSON.stringify(updatedSide));
    };

    const saveDeck = () => {
      const deckName = prompt('Nome do deck')

      if (deckName) {
        const deckData = {
          name: deckName,
          mainboard: deck,
          sideboard: side
        }

        const myDecks = JSON.parse(localStorage.getItem('myDecks')) || []

        myDecks.push(deckData)
        localStorage.setItem('myDecks', JSON.stringify(myDecks))

        setDeck([])
        setSide([])
        localStorage.setItem('deck', JSON.stringify([]))
        localStorage.setItem('side', JSON.stringify([]))
      }
    }
    
  return (
    <motion.div initial={{x: 100}} animate={{ x: 0 }} transition={{ duration: 0.4 }} className="deck-container">
        <div className="modal-header">
          <AiFillCloseSquare onClick={showDeck} className='close-btn' />
          {deck.length > 0 && (
            <button className='save-btn' onClick={saveDeck}>Salvar Deck</button>
          )}
        </div>

        <p className="deck-sub">Mainboard</p>
        {deck.map((card, index) => (
              <motion.div index={index} className="card-prev" initial={{x: 20}} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
                <p className='amount'>{card.amount}</p>
                <p>{card.name}</p>
                <div className="controls">
                  <button className="remove-one" onClick={(e) => removeFromDeck(1, index)}>-1</button>
                  <button className="remove-four" onClick={(e) => removeFromDeck(4, index)}>-4</button>
                </div>
              </motion.div>
          ))}

        <p className="deck-sub-s">Sideboard</p>
        {side.map((card, index) => (
              <motion.div index={index} className="card-prev-s" initial={{x: 20}} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
                <p className='amount'>{card.amount}</p>
                <p>{card.name}</p>
                <div className="controls">
                  <button className="remove-one-s" onClick={(e) => removeFromSide(1, index)}>-1</button>
                  <button className="remove-four-s" onClick={(e) => removeFromSide(4, index)}>-4</button>
                </div>
              </motion.div>
          ))}
    </motion.div>
  )
}

export default CurrentDeck