import React, { useState } from 'react'
import { AppConsumer } from '../../contexts/deckContext'
import './currentdeck.css'
import { motion } from 'framer-motion'
import { AiFillCloseSquare } from 'react-icons/ai'
import { toast } from 'react-toastify'


function CurrentDeck({showDeck}) {

    const {deck, setDeck, side, setSide, colors} = AppConsumer()

    const removeFromDeck = (amount, index) => {
      const updatedDeck = [...deck];
      const card = updatedDeck[index];
    
      card.amount = card.amount - amount;
    
        if (card.amount <= 0) {
          updatedDeck.splice(index, 1);
          toast.error("Card removido!")
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
          toast.error("Card removido!")
        }
    
      setSide(updatedSide);
      localStorage.setItem('side', JSON.stringify(updatedSide));
    };

    const saveDeck = () => {
      const oldDeckId = JSON.parse(localStorage.getItem('deckId'))
      const oldDeckName = JSON.parse(localStorage.getItem('deckName'))

      if (oldDeckId) {
        const deckData = {
          deckId: oldDeckId.replace(/"/g, ''),
          name: oldDeckName.replace(/"/g, ''),
          mainboard: deck,
          sideboard: side
        }

        const myDecks = JSON.parse(localStorage.getItem('myDecks')) || []
        const existingDeckIndex = myDecks.findIndex(deck => deck.deckId == oldDeckId)

        if (existingDeckIndex > -1) {
          myDecks[existingDeckIndex] = deckData
        }

        localStorage.setItem('myDecks', JSON.stringify(myDecks))
        toast.success('Deck salvo com sucesso!')
        
        localStorage.removeItem('deck')
        localStorage.removeItem('side')
        localStorage.removeItem('deckId')
        localStorage.removeItem('deckName')
        window.location.href = '/decks'
      } else {
        const deckName = prompt('Nome do deck')

        if (deckName) {
          const deckData = {
            deckId: Math.random(),
            name: deckName,
            mainboard: deck,
            sideboard: side
          }
  
          const myDecks = JSON.parse(localStorage.getItem('myDecks')) || []
  
          myDecks.push(deckData)
          localStorage.setItem('myDecks', JSON.stringify(myDecks))
          toast.success('Deck salvo com sucesso!')
  
          localStorage.removeItem('deck')
          localStorage.removeItem('side')
          localStorage.removeItem('deckId')
          localStorage.removeItem('deckName')
          window.location.href = '/decks'
        }
      }
    }

    const cardBg = (color) => {
      if (color.length === 0) {
        return colors.colorless
      }

      if (color.length > 1) {
        return colors.multi
      }

      if (color.length === 1) {
      return color[0] === 'W' ? colors.white : 
             color[0] === 'U' ? colors.blue : 
             color[0] === 'B' ? colors.black : 
             color[0] === 'R' ? colors.red : 
             color[0] === 'G' ? colors.green : colors.colorless}
    };

    const deckQtd = () => {
      let qtd = 0

      deck.forEach(card => qtd += card.amount)
      return qtd
    }

    const sideQtd = () => {
      let qtd = 0

      side.forEach(card => qtd += card.amount)
      return qtd
    }

    const sortedDeck = deck.sort((a, b) => a.type.localeCompare(b.type))
    const sortedSide = side.sort((a, b) => a.type.localeCompare(b.type))
    
  return (
    <motion.div initial={{x: 100}} animate={{ x: 0 }} transition={{ duration: 0.4 }} className="deck-container">
        <div className="modal-header">
          <AiFillCloseSquare onClick={showDeck} className='close-btn' />
          {deck.length > 0 && (
            <button className='save-btn' onClick={saveDeck}>Salvar Deck</button>
          )}
        </div>

        <p className="deck-sub">Mainboard {deckQtd()+'/'+60}</p>
        {sortedDeck.map((card, index) => (
              <motion.div style={{background: cardBg(card.color)}} className="card-prev" initial={{x: 20}} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
                <p className='amount'>{card.amount}</p>
                <p className='card-name'>{card.name}</p>
                <div className="controls">
                  <button className="remove-one" onClick={(e) => removeFromDeck(1, index)}>-1</button>
                  <button className="remove-four" onClick={(e) => removeFromDeck(4, index)}>-4</button>
                </div>
              </motion.div>
          ))}

        <p className="deck-sub-s">Sideboard {sideQtd()+'/'+15}</p>
        {sortedSide.map((card, index) => (
              <motion.div index={index} style={{background: cardBg(card.color)}} className="card-prev-s" initial={{x: 20}} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
                <p className='amount'>{card.amount}</p>
                <p className='card-name'>{card.name}</p>
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