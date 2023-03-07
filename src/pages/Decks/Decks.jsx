import React, { useEffect, useState } from 'react'
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'
import { AppConsumer } from '../../contexts/deckContext'
import './decks.css'
import { motion } from 'framer-motion'
import { MdDeleteSweep } from 'react-icons/md'
import { RiEdit2Fill } from 'react-icons/ri'
import { toast } from 'react-toastify'

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

    const handleDelete = (id) => {
        const newDecks = myDecks.filter(deck => deck.deckId !== id)

        setMyDecks(newDecks)
        localStorage.setItem('myDecks', JSON.stringify(newDecks))
        toast.error('Deck deletado!')
    }

    const handleEdit = (e, id) => {
        const deck = myDecks.filter(deck => deck.deckId === id)
        
        localStorage.setItem('deck', JSON.stringify(deck[0].mainboard))
        localStorage.setItem('side', JSON.stringify(deck[0].sideboard))
        localStorage.setItem('deckId', JSON.stringify(deck[0].deckId))
        localStorage.setItem('deckName', JSON.stringify(deck[0].name))
        
        window.location.href = '/'
    }
    
  return (
    <>
      <Background />
      <Header />

        <motion.div initial={{y:20, opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration:0.5}} className='decks-container'>
            <div className='decks'>
                {myDecks.map((deck, id) => (
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{backgroundImage: `url(${deck.mainboard[0].bg})`}} onClick={(e) => goTo(e, deck.deckId)} key={id} className='deck'>
                        <p>{deck.name}</p>
                    </div>
                    <div className="tools">
                        <MdDeleteSweep className='delete-icon' onClick={(e) => handleDelete(deck.deckId)}/>
                        <RiEdit2Fill className='edit-icon' onClick={(e) => handleEdit(e, deck.deckId)}/>
                    </div>
                </div>
                ))}
            </div>

            <button onClick={goBack} className='back-btn'>Voltar</button>
        </motion.div>
    </>
  )
}

export default Decks
