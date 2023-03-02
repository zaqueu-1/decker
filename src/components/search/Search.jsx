import React, { useState } from 'react'
import { AppConsumer } from '../../contexts/deckContext'
import axios from 'axios'
import './search.css'
import CurrentDeck from '../currentDeck/CurrentDeck'
import { motion } from 'framer-motion'
import { RxCardStack } from 'react-icons/rx'

function Search() {
    const [cardList, setCardList] = useState('')
    const [search, setSearch] = useState('')

    const searchCard = async(e) => {
        e.preventDefault()
    
         await axios
          .get(`https://api.scryfall.com/cards/search?q=${search}&include_multilingual=true`)
          .then(res => setCardList(res.data))
          .catch(err => console.log(err))
    
        console.log(cardList)
        console.log(cardList.data[0].image_uris.normal)
    }

    const {deck, setDeck} = AppConsumer()

    const addToDeck = (amount, index) => {
        let newCard = {
                name: cardList.data[index].name,
                image: cardList.data[index].image_uris.normal,
                amount: amount,
                id: cardList.data[index].id
            }
        
            setDeck([...deck, newCard])
            console.log(deck)
    }

    const {side, setSide} = AppConsumer()

    const addToSide = (amount, index) => {
        let newCard = {
                name: cardList.data[index].name,
                image: cardList.data[index].image_uris.normal,
                amount: amount,
                id: cardList.data[index].id
            }

            setSide([...side, newCard])
            console.log(side)
    }



    const [deckModal, setDeckModal] = useState(false)

    const showDeck = () => {
        (deckModal === false ? setDeckModal(true) : setDeckModal(false))
    }

  return (
    <div className='search-container'>
        <div className="input-wrapper">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="card-search" />
            <button onClick={searchCard} className="card-search-button">Buscar</button>
            <div onClick={showDeck} className="show-deck-wrapper">
                <RxCardStack className='show-deck-btn'/>
                <p className="show-deck-text">Ver Deck</p>
            </div>
        </div>

        {deck.length === 0 && side.length === 0 && cardList === '' && (
            <motion.div className="dno-deck-container" initial={{y: 35, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ duration: 0.8 }}>
                <div className="no-deck">
                    <p className="no-deck-text">Seu deck está vazio!<br/> Pesquise um card e adicione ao seu deck!</p>
                </div>
            </motion.div>
        )}

        <div className="card-list">
            {cardList.data && cardList.data.map((card, index) => (
            <motion.div initial={{y: 25, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ duration: 0.6 }} key={index} className="card">
                <img src={card.image_uris ? card.image_uris.normal : null} className='card-img' alt="" />
                {card.image_uris ? 
                    <div className='card-controls'>
                        <div className="mainboard-controls" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <p className='sub'>Main</p>
                            <div className="mainboard-buttons">
                                <button className="add-one" onClick={(e) => addToDeck(1, index)}>+1</button>
                                <button className="add-four" onClick={(e) => addToDeck(4, index)}>+4</button>
                            </div>
                        </div>

                        <div className="divider" />

                        <div className="side-controls" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <p className='sub'>Side</p>
                            <div className="side-buttons">
                                <button className="add-one-s" onClick={(e) => addToSide(1, index)}>+1</button>
                                <button className="add-four-s" onClick={(e) => addToSide(4, index)}>+4</button>
                            </div>
                        </div>
                    </div> : null}
               </motion.div>
            ))}

            {deckModal && (
                <>
                    <CurrentDeck showDeck={showDeck}/>
                </>
            )}


        </div>
    </div>
  )
}

export default Search
