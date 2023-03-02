import React, { createContext, useContext, useState } from 'react';

const DeckContext = createContext()

const AppProvider = ({ children }) => {
    const [deck, setDeck] = useState([])
    const [side, setSide] = useState([])
    const [myDecks, setMyDecks] = useState([])

    return (
    <DeckContext.Provider value={{
        deck,
        setDeck,
        side,
        setSide,
        myDecks,
        setMyDecks,
    }} >
        {children}
    </DeckContext.Provider>
    )
    }

const AppConsumer = () => useContext(DeckContext)

export { DeckContext, AppProvider, AppConsumer }