import PropTypes from 'prop-types'
import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faRotateLeft, faRepeat } from '@fortawesome/free-solid-svg-icons'

const pieceSize = 100

const pieceStyle = {
  width: pieceSize + 'px',
  height: pieceSize + 'px'
}

const Piece = ({ piece, handleClick, selectedPiece }) => {
  const pieceRef = useRef()

  const [currentPiece, setCurrentPiece] = useState(piece.shape)
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })

  const isSelected = selectedPiece === piece.id

  useEffect(() => {
    dragElement(pieceRef.current)
    setCurrentPosition({ x: piece.startingPosition.x, y: piece.startingPosition.y })
  }, [])

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

      console.log(element)

      const newPositionX = Math.round(element.offsetLeft / 100) * 100
      const newPositionY = Math.round(element.offsetTop / 100) * 100
      setCurrentPosition({ x: newPositionX, y: newPositionY })
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
      onClick={onClick}
      style={{ left: currentPosition.x, top: currentPosition.y }}>
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
  piece: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedPiece: PropTypes.any.isRequired
}

export default Piece