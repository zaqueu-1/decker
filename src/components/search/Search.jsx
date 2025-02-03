import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./search.css"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { GiHearts } from "react-icons/gi"

function Search() {
  const navigate = useNavigate()
  const [cardList, setCardList] = useState("")
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const searchCard = async (e) => {
    if (!search.trim()) {
      toast.error("Digite algo para pesquisar")
      return
    }

    setIsLoading(true)
    try {
      const res = await axios.get(
        `https://api.scryfall.com/cards/search?q=${search}&order=color&include_multilingual=true`,
      )
      setCardList(res.data)
      if (res.data.data.length === 0) {
        toast.info("Nenhuma carta encontrada")
      }
    } catch (err) {
      console.error(err)
      toast.error("Erro ao buscar carta")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === "Enter") {
      searchCard()
    }
  }

  return (
    <div className='search-container'>
      <div className='input-wrapper'>
        <input
          type='text'
          value={search}
          onKeyDown={handleKey}
          onChange={(e) => setSearch(e.target.value)}
          className='card-search'
          placeholder='Digite o nome da carta...'
        />
        <button onClick={searchCard} className='card-search-button'>
          Buscar
        </button>
        <button
          onClick={() => navigate("/life")}
          className='life-counter-button'
        >
          <GiHearts /> Contador
        </button>
      </div>

      {isLoading && (
        <motion.div
          className='loading-container'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p>Carregando cartas...</p>
        </motion.div>
      )}

      {cardList === "" && !isLoading && (
        <motion.div
          className='no-deck-container'
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className='no-deck'>
            <p className='no-deck-text'>
              Digite o nome de uma carta para pesquisar!
            </p>
          </div>
        </motion.div>
      )}

      <div className='card-list'>
        {cardList.data &&
          cardList.data.map((card, index) =>
            card.image_uris ? (
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                key={index}
                className='card'
              >
                <img
                  src={card.image_uris.normal}
                  className='card-img'
                  alt={card.name}
                />
                <div className='card-info'>
                  <h3>{card.name}</h3>
                  <p>{card.type_line}</p>
                  {card.oracle_text && (
                    <p className='card-text'>{card.oracle_text}</p>
                  )}
                </div>
              </motion.div>
            ) : null,
          )}
      </div>
    </div>
  )
}

export default Search
