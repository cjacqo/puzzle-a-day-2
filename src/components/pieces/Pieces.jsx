import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from "react"
import './styles.css'
import { useDrag } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faRotateLeft, faRepeat } from '@fortawesome/free-solid-svg-icons'
import ItemTypes from './ItemTypes'

const pieceStyle = {
  width: '50px',
  height: '50px'
}

const Piece = ({ id, piece, handleClick, selectedPiece }) => {
  const pieceRef = useRef()

  const [currentPiece, setCurrentPiece] = useState(piece.shape)
  const [currentPosition, setCurrentPosition] = useState()

  const isSelected = selectedPiece === piece.id

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  useEffect(() => {
    dragElement(pieceRef.current)
  }, [])

  useEffect(() => {
    console.log(currentPosition)
  }, [currentPosition])

  function updateCurrentPosition() {
    const rect = pieceRef.current.getBoundingClientRect()
    setCurrentPosition(rect.x)
  }

  function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    element.onmousedown = dragMouseDown

    function dragMouseDown(e) {
      e = e || window.event
      e.preventDefault()

      // Get mouse cursor position at start
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement

      // Call a function whenever the mouse moves
      document.onmousemove = elementDrag
    }

    function elementDrag(e) {
      e = e || window.event
      e.preventDefault()

      // Calculate new cursor position
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY

      // Set element's new position
      element.style.top = (element.offsetTop - pos2) + 'px'
      element.style.left = (element.offsetLeft - pos1) + 'px'
    }

    function closeDragElement() {
      // Stop moving when mouse is released
      document.onmouseup = null
      document.onmousemove = null

      updateCurrentPosition()
    }
  }

  const onClick = (e) => {
    handleClick(e, piece.id)
  }

  const handleFlip = () => {
    piece.flip()
    setCurrentPiece(piece.shape)
  }

  const handleForwardRotation = () => {
    piece.rotateForward()
    setCurrentPiece(piece.shape)
  }

  const handleBackwardRotation = () => {
    piece.rotateBackward()
    setCurrentPiece(piece.shape)
  }

  return (
    <div
      className={`piece ${isSelected && 'selected'}`}
      id={piece.id}
      ref={pieceRef}
      onClick={onClick}>
      {
        currentPiece.map((r, x) => {
          return (
            <div key={x} className='row'>
              {
                r.map((c, y) => {
                  if (c === 1) {
                    return (
                      <div
                        key={`${x}-${y}`}
                        style={{
                          ...pieceStyle,
                          backgroundColor: piece.color
                      }} />
                    )
                  } else {
                    return (
                      <div
                        key={`${x}-${y}`}
                        style={{...pieceStyle}} />
                    )
                  }
                })
              }
            </div>
          )
        })
      }
      {
        isSelected && (
          <div className="controls">
            <FontAwesomeIcon icon={faRepeat} onClick={handleFlip} />
            <FontAwesomeIcon icon={faRotateLeft} onClick={handleBackwardRotation} />
            <FontAwesomeIcon icon={faRotateRight} onClick={handleForwardRotation} />
          </div>
        )
      }
    </div>
  )
}

Piece.propTypes = {
  id: PropTypes.number.isRequired,
  piece: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedPiece: PropTypes.any.isRequired
}

const Pieces = () => {
  const [selectedPiece, setSelectedPiece] = useState(false)
  
  const handleClick = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedPiece(id)
  }

  window.addEventListener('click', (e) => {
    e.preventDefault()
    setSelectedPiece(false)
  })

  return (
    <div className="pieces-container">
      {
        ItemTypes.map(item => (
          <Piece
            key={item.id}
            id={item.id}
            piece={item.piece}
            handleClick={handleClick}
            selectedPiece={selectedPiece} />
        ))
      }
    </div>
  )
}

export default Pieces