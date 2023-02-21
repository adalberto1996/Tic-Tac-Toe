import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURN, WINNER_COMBOS } from './constants'
import { checkWinnerFrom, checkendGame } from './board'
import { WinnerModal } from './components/winnerModal'

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURN.X)
  const [winner, setWinner] =  useState(null)



  const resetGame= () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
  }

 

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)
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
