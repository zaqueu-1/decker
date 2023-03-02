import React, { useState } from 'react'
import { AppConsumer } from '../../contexts/deckContext'
import './currentdeck.css'

function CurrentDeck() {

    const {deck, setDeck} = AppConsumer()

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
    

  return (
    <div className="deck-container">
        {deck.map((card, index) => (
            <div key={index} className="deck">
                <div className="card-prev">
                    <p className='amount'>{card.amount}</p>
                    <p>{card.name}</p>
                    <div className="controls">
                      <button className="remove-one" onClick={(e) => removeFromDeck(1, index)}>-1</button>
                      <button className="remove-four" onClick={(e) => removeFromDeck(4, index)}>-4</button>
                    </div>
                </div>
            </div>
            ))}
    </div>
  )
}

export default CurrentDeck
