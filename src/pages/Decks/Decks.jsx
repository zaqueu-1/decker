import React, { useEffect, useState } from 'react'
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'
import { AppConsumer } from '../../contexts/deckContext'
import './decks.css'

function Decks() {

    const {myDecks, setMyDecks} = AppConsumer()

    useEffect(() => {
        const myDecks = localStorage.getItem('myDecks')
        if (myDecks) {
            setMyDecks(JSON.parse(myDecks))
            console.log(myDecks)
        }
    }, [])
    
  return (
    <>
      <Background />
      <Header />

        <div className='decks-container'>
            <div className='decks'>
                {myDecks.map((deck, id) => (
                        <div style={{backgroundImage: `url(${deck.mainboard[0].bg})`}} key={id} className='deck'>
                            <p>{deck.name}</p>
                        </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Decks
