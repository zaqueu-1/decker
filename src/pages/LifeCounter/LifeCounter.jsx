import React,{ useState } from 'react'
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'
import './lifecounter.css'
import { GiPoisonBottle } from 'react-icons/gi'
import { toast } from 'react-toastify'

function LifeCounter() {
    const [gameState, setGameState] = useState({
        player1Life: 20,
        player2Life: 20,
        player1Poison: 0,
        player2Poison: 0
      })
      
      const handleLife = (player, amount) => {
        setGameState(prev => 
          (player === 1 ? { ...prev, player1Life: prev.player1Life - amount } : { ...prev, player2Life: prev.player2Life - amount })
        )
      }
      
      const handlePoison = (player, amount) => {
        setGameState(prev => 
            (player === 1 ? { ...prev, player1Poison: prev.player1Poison - amount } : { ...prev, player2Poison: prev.player2Poison - amount })
        )
    }
      
        const handleReset = () => {
            setGameState({
            player1Life: 20,
            player2Life: 20,
            player1Poison: 0,
            player2Poison: 0
            })
        }

        const rollDice = (sides) => {
            const roll = Math.floor(Math.random() * sides) + 1
            toast.success(`Você rolou um ${roll}!`)
        }

  return (
    <>
        <Background />
        <Header />

        <div className="counter-container">
            <div className="player1">
                
                <div className="wrapper">
                    <div className="lower-btns">
                        <button onClick={(e) => handleLife(1,1)} className="btn">-1</button>
                        <button onClick={(e) => handleLife(1,5)} className="btn">-5</button>
                    </div>
                    <span className='life'>{gameState.player1Life}</span>
                    <div className="add-btns">
                        <button onClick={(e) => handleLife(1,-1)} className="btn">+1</button>
                        <button onClick={(e) => handleLife(1,-5)} className="btn">+5</button>
                    </div>
                </div>
                <div className="poison-div">
                    <button onClick={(e) => handlePoison(1,1)} className="poison-btn">-</button>
                    <span className='poison'><GiPoisonBottle /> Veneno: {gameState.player1Poison}</span>
                    <button onClick={(e) => handlePoison(1,-1)} className="poison-btn">+</button>
                </div>
            </div>

            <div className="addons">
                <button onClick={(e) => rollDice(6)} className="dice-btn">Rolar D6</button>
                <button onClick={handleReset} className="reset-btn">Reset</button>
                <button onClick={(e) => rollDice(20)} className="dice-btn">Rolar D20</button>
            </div>

            <div className="player2">
                <div className="wrapper">
                    <div className="lower-btns">
                        <button onClick={(e) => handleLife(2,1)} className="btn">-1</button>
                        <button onClick={(e) => handleLife(2,5)} className="btn">-5</button>
                    </div>
                    <span className='life'>{gameState.player2Life}</span>
                    <div className="add-btns">
                        <button onClick={(e) => handleLife(2,-1)} className="btn">+1</button>
                        <button onClick={(e) => handleLife(2,-5)} className="btn">+5</button>
                    </div>
                </div>
                <div className="poison-div">
                    <button onClick={(e) => handlePoison(2,1)} className="poison-btn">-</button>
                    <span className='poison'><GiPoisonBottle /> Veneno: {gameState.player2Poison}</span>
                    <button onClick={(e) => handlePoison(2,-1)} className="poison-btn">+</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default LifeCounter
