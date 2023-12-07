import './App.css'
import { drawTetromino } from './helpers/Helpers'

function App() {

  const test = drawTetromino(5, 1, 1)
  console.log(test)
  
  return (
    <>
      <div className="heading-container">
        <h1>Puzzle a Day</h1>
      </div>
    </>
  )
}

export default App
