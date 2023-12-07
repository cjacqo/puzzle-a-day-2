import './App.css'
import { useEffect, useRef } from 'react'
import Canvas from './components/canvas/Canvas'
import Pieces from './components/pieces/Pieces'

function App() {
  const draw = (ctx) => {
    console.log(pieceT.piece)
    const tileSize = 30
    for (let y = 0; y < pieceT.piece.length; y++) {
      for (let x = 0; x < pieceT.piece[y].length; x++) {
        ctx.fillStyle = 'red'
        if (pieceT.piece[y][x] === 1) ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
      }
    }
  }
  
  return (
    <>
      <div className="heading-container">
        <h1>Puzzle a Day</h1>
      </div>

      {/* <div ref={refContainer}></div> */}

      {/* <Canvas
        width='800'
        height='800' /> */}

      <Pieces />
    </>
  )
}

export default App
