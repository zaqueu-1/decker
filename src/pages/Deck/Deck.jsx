import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppConsumer } from '../../contexts/deckContext'
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'
import './deck.css'
import { motion } from 'framer-motion'

function Deck() {
  const { id } = useParams()

  const {deck, setDeck, side, setSide, myDecks, setMyDecks} = AppConsumer()

  useEffect(() => {
    const myDecks = JSON.parse(localStorage.getItem('myDecks'))
    const loadDeck = myDecks.find(deck => deck.deckId == id)

    setDeck(loadDeck.mainboard)
    setSide(loadDeck.sideboard)

    deckCreatures(loadDeck.mainboard)
    deckSpells(loadDeck.mainboard)
    deckLands(loadDeck.mainboard)
  }, [])
  
  const [creatures, setCreatures] = useState([])
  const [spells, setSpells] = useState([])
  const [lands, setLands] = useState([])

  const deckCreatures = (deck) => {
    const filterCreatures = deck.filter(card => card.type.includes('Creature'))
    const sortCreaturesByCost = filterCreatures.sort((a, b) => a.cmc - b.cmc)
  
    setCreatures(sortCreaturesByCost)
  }

  const deckSpells = (deck) => {
    const filterSpells = deck.filter(card => !card.type.includes('Creature') && !card.type.includes('Land'))  
    const sortSpellsByCost = filterSpells.sort((a, b) => a.cmc - b.cmc)

    setSpells(sortSpellsByCost)
  }

  const deckLands = (deck) => {
    const filterLands = deck.filter(card => card.type.includes('Land'))
    const sortLandsByCost = filterLands.sort((a, b) => a.cmc - b.cmc)

    setLands(sortLandsByCost)
  }

  const renderCards = (cards) => {
      const cardImgs = []

      for (let i = 0; i < cards.amount; i++) {
        cardImgs.push(
            <img src={cards.image} alt={cards.name} className='card-small-prev'/>
        )
      }

      return <div className="samecard-area">{cardImgs}</div>
  }

  const goTo = () => {
    window.location.href = '/decks'
  }
  
  return (
    <>
      <Background />
      <Header />
      <div className='deck-area'>
        {creatures.length > 0 ? (
          <motion.div initial={{y:20, opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration:0.5}} className="card-area">
            <div className="title">
              <h1>Criaturas</h1>
            </div>
            <div className="prev-area">
              {creatures.map((card, id) => 
                renderCards(card)
              )}  
            </div>
          </motion.div>
        ): null}

        {spells.length > 0 ? (
          <motion.div initial={{y:20, opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration:0.5}} className="card-area">
            <div className="title">
              <h1>Mágicas</h1>
            </div>
              <div className="prev-area">
                {spells.map((card, id) => 
                  renderCards(card)
                )}
              </div>
        </motion.div>
        ): null}

        {lands.length> 0 ? (
          <motion.div initial={{y:20, opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration:0.5}} className="card-area">
            <div className="title">
              <h1>Terrenos</h1>
            </div>
              <div className="prev-area">
                {lands.map((card, id) => 
                  renderCards(card)
                )}  
              </div>
        </motion.div>
        ): null}

        {side.length > 0 ? (
          <motion.div initial={{y:20, opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration:0.5}} className="card-area">
            <div className="title">
              <h1>Sideboard</h1>
            </div>
              <div className="prev-area">
                {side.map((card, id) => 
                  renderCards(card)
                )}  
              </div>
        </motion.div>
        ): null}
      </div>

      <button onClick={goTo} className='back-btn'>Voltar</button>
    </>
  )
}

export default Deck
