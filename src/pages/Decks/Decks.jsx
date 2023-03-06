import React, { useEffect, useState } from 'react'
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'
import { AppConsumer } from '../../contexts/deckContext'
import './decks.css'
import { motion } from 'framer-motion'

function Decks() {

    const {myDecks, setMyDecks} = AppConsumer()

    useEffect(() => {
        const myDecks = localStorage.getItem('myDecks')
        if (myDecks) {
            setMyDecks(JSON.parse(myDecks))
            console.log(myDecks)
        }
    }, [])

    const goTo = (e, id) => {
        window.location.href = `/deck/${id}`
    }

    const goBack = () => {
        window.location.href = '/'
    }
    
  return (
    <>
      <Background />
      <Header />

        <motion.div initial={{y:20, opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration:0.5}} className='decks-container'>
            <div className='decks'>
                {myDecks.map((deck, id) => (
                    <div style={{backgroundImage: `url(${deck.mainboard[0].bg})`}} onClick={(e) => goTo(e, deck.deckId)} key={id} className='deck'>
                        <p>{deck.name}</p>
                    </div>
                ))}
            </div>

            <button onClick={goBack} className='back-btn'>Voltar</button>
        </motion.div>
    </>
  )
}

export default Decks
