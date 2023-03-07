import React, { useEffect, useState } from 'react'
import { AppConsumer } from '../../contexts/deckContext'
import axios from 'axios'
import './search.css'
import CurrentDeck from '../currentDeck/CurrentDeck'
import { motion } from 'framer-motion'
import { RxCardStack } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Search() {

    const [cardList, setCardList] = useState('')
    const [search, setSearch] = useState('')

    const searchCard = async(e) => {
        await axios
          .get(`https://api.scryfall.com/cards/search?q=${search}&order=color&include_multilingual=true`)
          .then(res => setCardList(res.data))
          .catch(err => console.log(err))
    
        console.log(cardList)
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            searchCard(search)
        }
    }

    const {deck, setDeck, side, setSide, myDecks, setMyDecks} = AppConsumer()

    useEffect(() => {
        const deck = JSON.parse(localStorage.getItem('deck'))
        if (deck) {
            setDeck(deck)
        }

        const side = JSON.parse(localStorage.getItem('side'))
        if (side) {
            setSide(side)
        }

        const myDecks = JSON.parse(localStorage.getItem('myDecks'))
        if (myDecks) {
            setMyDecks(myDecks)
        }

        if (deck || side) {
            setDeckModal(true)
        }
    }, [])

    const addToDeck = (amount, index) => {
        const existingCardIndex = deck.findIndex(card => card.id === cardList.data[index].id)

        if (existingCardIndex >= 0) {
          const updatedDeck = [...deck]
          
          updatedDeck[existingCardIndex] = {
            ...deck[existingCardIndex],
            amount: deck[existingCardIndex].amount + amount
          }
          setDeck(updatedDeck) 
          localStorage.setItem('deck', JSON.stringify(updatedDeck))
        } else {
          const newCard = {
            name: cardList.data[index].name,
            image: cardList.data[index].image_uris.normal,
            bg: cardList.data[index].image_uris.art_crop,
            amount: amount,
            id: cardList.data[index].id,
            color: cardList.data[index].color_identity,
            type: cardList.data[index].type_line,
            cmc: cardList.data[index].cmc
          }
            setDeck([...deck, newCard])
            localStorage.setItem('deck', JSON.stringify([...deck, newCard]))
            toast.success('Carta adicionada ao deck')
        }
        console.log(deck)
    }

    const addToSide = (amount, index) => {
        const existingCardIndex = side.findIndex(card => card.id === cardList.data[index].id)

        if (existingCardIndex >= 0) {
          const updatedSide = [...side]
          
          updatedSide[existingCardIndex] = {
            ...side[existingCardIndex],
            amount: side[existingCardIndex].amount + amount
          }
            setSide(updatedSide) 
            localStorage.setItem('side', JSON.stringify(updatedSide))
        } else {
          const newCard = {
            name: cardList.data[index].name,
            image: cardList.data[index].image_uris.normal,
            bg: cardList.data[index].image_uris.art_crop,
            amount: amount,
            id: cardList.data[index].id,
            color: cardList.data[index].color_identity,
            type: cardList.data[index].type_line,
            cmc: cardList.data[index].cmc
          }
            setSide([...side, newCard])
            localStorage.setItem('side', JSON.stringify([...side, newCard]))
            toast.success('Carta adicionada ao sideboard')
        }
        console.log(side)
    }

    const [deckModal, setDeckModal] = useState(false)

    const showDeck = () => (deckModal === false ? setDeckModal(true) : setDeckModal(false))

    const showMyDecks = () => {
        const myDecks = JSON.parse(localStorage.getItem('decks'))

        if (myDecks) {
            setMyDecks(myDecks)
        }
    }

  return (
    <div className='search-container'>
        <div className="input-wrapper">
            <input type="text" value={search} onKeyDown={handleKey} onChange={(e) => setSearch(e.target.value)} className="card-search" />
            <button onClick={searchCard} className="card-search-button">Buscar</button>
            <div className="deck-btns">
                <div onClick={showDeck} className="show-deck-wrapper">
                    <RxCardStack className='show-deck-btn'/>
                    <p className="show-deck-text">Ver Deck</p>
                </div>
                <Link to='/decks'>
                    <div style={ myDecks.length > 0 ? {display: 'block'} : {display: 'none'} } onClick={showMyDecks} className="show-mydecks-wrapper">
                        <RxCardStack className='show-deck-btn'/>
                        <p className="show-deck-text">Meus Decks</p>
                    </div>
                </Link>
            </div>
        </div>

        {cardList === '' && (
            <motion.div className="dno-deck-container" initial={{y: 35, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ duration: 0.8 }}>
                <div className="no-deck">
                {deck.length === 0 && side.length === 0 ? (
                    <p className="no-deck-text">Seu deck está vazio!<br/> Pesquise um card e adicione ao seu deck!</p>) : 
                    (<p className="no-deck-text">Deseja continuar, Planinalta? <br/><br/> Clique em <i>'Ver Deck'</i> e veja seu grimório!</p>)}
                </div>
            </motion.div>
        )}

        <div className="card-list">
            {cardList.data && cardList.data.map((card, index) => (
                (card.image_uris ?
                    <motion.div initial={{y: 25, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ duration: 0.6 }} key={index} className="card">
                    <img src={card.image_uris.normal} className='card-img' alt="" />
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
                        </div>
                </motion.div>
                : null)
            ))}

            {deckModal && <CurrentDeck showDeck={showDeck}/>}

        </div>
    </div>
  )
}

export default Search