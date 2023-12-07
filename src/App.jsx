import './App.css'
import { pieceT, pieceZ, pieceU, pieceCorner, pieceL, pieceS, pieceB, pieceRectangle } from './puzzle/pieces'

function App() {

  console.log(pieceT.piece)

  pieceT.rotatePieceForward()

  console.log(pieceT.piece)
  
  return (
    <>
      <div className="heading-container">
        <h1>Puzzle a Day</h1>
      </div>
    </>
  )
}

export default App
