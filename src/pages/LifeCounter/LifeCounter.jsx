import React, { useState } from "react"
import Background from "../../components/background/Background"
import Header from "../../components/header/Header"
import "./lifecounter.css"
import { GiPoisonBottle } from "react-icons/gi"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const LifeCounter = () => {
  const [initialVal, setInitialVal] = useState(20)
  const [showInitialInput, setShowInitialInput] = useState(false)
  const [gameState, setGameState] = useState({
    player1Life: 20,
    player2Life: 20,
    player1Poison: 0,
    player2Poison: 0,
  })

  const handleLife = (player, amount) => {
    setGameState((prev) =>
      player === 1
        ? { ...prev, player1Life: prev.player1Life - amount }
        : { ...prev, player2Life: prev.player2Life - amount },
    )
  }

  const handlePoison = (player, amount) => {
    setGameState((prev) => {
      if (player === 1 && prev.player1Poison >= 0 && prev.player1Poison <= 10) {
        const newPoison = Math.max(0, Math.min(10, prev.player1Poison - amount))
        return { ...prev, player1Poison: newPoison }
      }
      if (player === 2 && prev.player2Poison >= 0 && prev.player2Poison <= 10) {
        const newPoison = Math.max(0, Math.min(10, prev.player2Poison - amount))
        return { ...prev, player2Poison: newPoison }
      } else {
        return { ...prev }
      }
    })
  }

  const handleReset = () => {
    setGameState({
      player1Life: initialVal,
      player2Life: initialVal,
      player1Poison: 0,
      player2Poison: 0,
    })
  }

  const rollDice = (sides) => {
    const roll = Math.floor(Math.random() * sides) + 1
    toast.success(`Você rolou um ${roll}!`)
  }

  const handleInitialSubmit = () => {
    if (initialVal > 0) {
      setGameState((prev) => ({
        ...prev,
        player1Life: Number(initialVal),
        player2Life: Number(initialVal),
      }))
      setShowInitialInput(false)
    } else {
      toast.error("Por favor, insira um valor maior que 0")
    }
  }

  return (
    <>
      <Background />
      <Header />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='counter-container'
      >
        <div className='player1'>
          <div className='wrapper'>
            <div className='lower-btns'>
              <button onClick={(e) => handleLife(1, 1)} className='btn'>
                -1
              </button>
              <button onClick={(e) => handleLife(1, 5)} className='btn'>
                -5
              </button>
              <button onClick={(e) => handleLife(1, 10)} className='btn'>
                -10
              </button>
            </div>
            <span className='life'>{gameState.player1Life}</span>
            <div className='add-btns'>
              <button onClick={(e) => handleLife(1, -1)} className='btn'>
                +1
              </button>
              <button onClick={(e) => handleLife(1, -5)} className='btn'>
                +5
              </button>
              <button onClick={(e) => handleLife(1, -10)} className='btn'>
                +10
              </button>
            </div>
          </div>
          <div className='poison-div'>
            <button onClick={(e) => handlePoison(1, 1)} className='poison-btn'>
              -
            </button>
            <span className='poison'>
              <GiPoisonBottle /> Veneno: {gameState.player1Poison}
            </span>
            <button onClick={(e) => handlePoison(1, -1)} className='poison-btn'>
              +
            </button>
          </div>
        </div>

        <div className='addons'>
          <button onClick={(e) => rollDice(6)} className='dice-btn'>
            Rolar D6
          </button>
          <button onClick={(e) => rollDice(20)} className='dice-btn'>
            Rolar D20
          </button>
          <button
            onClick={(e) => setShowInitialInput(!showInitialInput)}
            className='life-btn'
          >
            Alterar Vida
          </button>
          <button onClick={(e) => handleReset()} className='reset-btn'>
            Reset
          </button>
        </div>

        <div className='player2'>
          <div className='wrapper'>
            <div className='lower-btns'>
              <button onClick={(e) => handleLife(2, 1)} className='btn'>
                -1
              </button>
              <button onClick={(e) => handleLife(2, 5)} className='btn'>
                -5
              </button>
              <button onClick={(e) => handleLife(2, 10)} className='btn'>
                -10
              </button>
            </div>
            <span className='life'>{gameState.player2Life}</span>
            <div className='add-btns'>
              <button onClick={(e) => handleLife(2, -1)} className='btn'>
                +1
              </button>
              <button onClick={(e) => handleLife(2, -5)} className='btn'>
                +5
              </button>
              <button onClick={(e) => handleLife(2, -10)} className='btn'>
                +10
              </button>
            </div>
          </div>
          <div className='poison-div'>
            <button onClick={(e) => handlePoison(2, 1)} className='poison-btn'>
              -
            </button>
            <span className='poison'>
              <GiPoisonBottle /> Veneno: {gameState.player2Poison}
            </span>
            <button onClick={(e) => handlePoison(2, -1)} className='poison-btn'>
              +
            </button>
          </div>
        </div>

        <Link to='/'>
          <button className='back-btn'>Voltar</button>
        </Link>
      </motion.div>

      {showInitialInput && (
        <motion.div
          className='initial-setup'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className='initial-input-wrapper'>
            <input
              type='number'
              value={initialVal}
              onChange={(e) => setInitialVal(e.target.value)}
              className='initial-life-input'
              placeholder='Vida inicial'
            />
            <button
              onClick={(e) => handleInitialSubmit()}
              className='initial-life-button'
            >
              OK
            </button>
            <button
              onClick={(e) => setShowInitialInput(!showInitialInput)}
              className='initial-life-cancel'
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default LifeCounter
