import PropTypes from 'prop-types'
import { useRef } from 'react'
import './styles.css'

const squareSize = 100

const squareStyle = {
  width: squareSize + 'px',
  height: squareSize + 'px',
  border: '1px solid black',
  margin: '-1px 0 0 -1px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const Square = ({ text }) => {
  const squareRef = useRef()

  return (
    <div style={{...squareStyle}} ref={squareRef}>
      {text}
    </div>
  )
}

Square.propTypes = {
  text: PropTypes.string.isRequired
}

const Board = ({ children }) => {
  return (
    <div className="board-container">
      <div className="board-wrapper">
        <div className="board-row">
          <Square text='Jan' />
          <Square text='Feb' />
          <Square text='Mar' />
          <Square text='Apr' />
          <Square text='May' />
          <Square text='Jun' />
        </div>
        <div className="board-row">
          <Square text='Jul' />
          <Square text='Aug' />
          <Square text='Sep' />
          <Square text='Oct' />
          <Square text='Nov' />
          <Square text='Dec' />
        </div>
        <div className="board-row">
          <Square text='1' />
          <Square text='2' />
          <Square text='3' />
          <Square text='4' />
          <Square text='5' />
          <Square text='6' />
          <Square text='7' />
        </div>
        <div className="board-row">
          <Square text='8' />
          <Square text='9' />
          <Square text='10' />
          <Square text='11' />
          <Square text='12' />
          <Square text='13' />
          <Square text='14' />
        </div>
        <div className="board-row">
          <Square text='15' />
          <Square text='16' />
          <Square text='17' />
          <Square text='18' />
          <Square text='19' />
          <Square text='20' />
          <Square text='21' />
        </div>
        <div className="board-row">
          <Square text='22' />
          <Square text='23' />
          <Square text='24' />
          <Square text='25' />
          <Square text='26' />
          <Square text='27' />
          <Square text='28' />
        </div>
        <div className="board-row">
          <Square text='29' />
          <Square text='30' />
          <Square text='31' />
        </div>
      </div>
      {children}
    </div>
  )
}

Board.propTypes = {
  children: PropTypes.any.isRequired
}

export default Board