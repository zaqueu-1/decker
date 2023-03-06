import React, { createContext, useContext, useState } from 'react';

const DeckContext = createContext()

const AppProvider = ({ children }) => {
    const [deck, setDeck] = useState([])
    const [side, setSide] = useState([])
    const [myDecks, setMyDecks] = useState([])

    const colors = {
        red: '#A53431',
        blue: '#29558C',
        green:  '#4F9046',
        black: '#80326F',
        white: '#8F8469',
        colorless: '#737472',
        multi: '#9E7600',
    }

    return (
    <DeckContext.Provider value={{
        deck,
        setDeck,
        side,
        setSide,
        myDecks,
        setMyDecks,
        colors,
    }} >
        {children}
    </DeckContext.Provider>
    )
    }

const AppConsumer = () => useContext(DeckContext)

export { DeckContext, AppProvider, AppConsumer }