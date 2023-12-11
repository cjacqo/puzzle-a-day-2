import './App.css'
import Board from './components/board/Board'
import Pieces from './components/pieces/Pieces'

function App() {
  return (
    <>
      <div className="heading-container">
        <h1>Puzzle a Day</h1>
      </div>
      <Board>
        <Pieces />
      </Board>
    </>
  )
}

export default App
