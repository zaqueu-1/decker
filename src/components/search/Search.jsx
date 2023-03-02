import React, { useState } from 'react'
import { AppConsumer } from '../../contexts/deckContext'
import axios from 'axios'
import './search.css'
import CurrentDeck from '../currentDeck/CurrentDeck'

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

    const [deckModal, setDeckModal] = useState(false)

    const showDeck = () => {
        (deckModal === false ? setDeckModal(true) : setDeckModal(false))
    }

  return (
    <div className='search-container'>
        <div className="input-wrapper">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="card-search" />
            <button onClick={searchCard} className="card-search-button">Buscar</button>
            <button className="show-deck" onClick={showDeck}>ver deck</button>
        </div>

        <div className="card-list">
            {cardList.data && cardList.data.map((card, index) => (
            <div key={index} className="card">
                <img src={card.image_uris ? card.image_uris.normal : null} className='card-img' alt="" />
                {card.image_uris ? 
                    <div classname='card-controls'>
                        <button className="add-one" onClick={(e) => addToDeck(1, index)}>+1</button>
                        <button className="add-four" onClick={(e) => addToDeck(4, index)}>+4</button>
                    </div> : null}
               </div>
            ))}

            {deckModal && (
                <>
                    <CurrentDeck />
                </>
            )}


        </div>
    </div>
  )
}

export default Search
