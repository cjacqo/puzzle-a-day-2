import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from '../pieces/ItemTypes'
import './styles.css'

const squareStyle = {
  width: '50px',
  height: '50px',
  outline: '1px solid black'
}

const Square = ({ text }) => {
  const squareRef = useRef()
  const [x, setX] = useState()

  useEffect(() => {
    const rect = squareRef.current.getBoundingClientRect()
    setX(rect.x)
  }, [])

  useEffect(() => {
    console.log(x)
  }, [x])
  
  return (
    <div style={{...squareStyle}} ref={squareRef}>
      {text}
    </div>
  )
}

Square.propTypes = {
  text: PropTypes.string.isRequired
}

const Board = () => {
  const [board, setBoard] = useState([])
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'div',
    drop: (item) => addPieceToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addPieceToBoard = (id) => {
    const items = ItemTypes.filter((item) => item.id === id)
    setBoard((board) => [...board, items[0]])
  }

  return (
    <div className="board-container" ref={drop}>
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
    </div>
  )
}

export default Board