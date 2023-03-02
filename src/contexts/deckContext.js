import React, { createContext, useContext, useState } from 'react';

const DeckContext = createContext()

const AppProvider = ({ children }) => {
    const [deck, setDeck] = useState([])

    return (
    <DeckContext.Provider value={{
        deck,
        setDeck,
    }} >
        {children}
    </DeckContext.Provider>
    )
    }

const AppConsumer = () => useContext(DeckContext)

export { DeckContext, AppProvider, AppConsumer }