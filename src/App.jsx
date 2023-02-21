import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURN, WINNER_COMBOS } from './constants'
import { checkWinnerFrom, checkendGame } from './board'
import { WinnerModal } from './components/winnerModal'

function App() {

  const [board, setBoard] = useState(() =>{ 
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURN.X
  })
  
    const [winner, setWinner] =  useState(null)


  const resetGame= () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

 

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if (checkendGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
          {
            board.map((_, index ) => {
              return (
                <Square 
                  key={index} 
                  index={index}
                  updateBoard={updateBoard} 
                >
                  {board[index]}
                </Square>
              )

            })
          }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURN.X} >
          {TURN.X}
        </Square>
        <Square isSelected={turn === TURN.O}>
          {TURN.O}
        </Square>
      </section>
      <section>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </section>
    </main>
    
  )
}

export default App
