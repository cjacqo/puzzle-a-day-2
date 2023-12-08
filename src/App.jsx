import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Board from './components/board/Board'
import Pieces from './components/pieces/Pieces'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="heading-container">
        <h1>Puzzle a Day</h1>
      </div>
      <Board>
        <Pieces />
      </Board>
    </DndProvider>
  )
}

export default App
