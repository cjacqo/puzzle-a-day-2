import { useEffect, useRef } from "react"
import { pieceB, pieceCorner, pieceL, pieceRectangle, pieceS, pieceT, pieceU, pieceZ } from "../../puzzle/pieces"
import './styles.css'

const Piece = (pieceObj) => {
  const { piece } = pieceObj
  const size = '20px'

  const pieceRef = useRef()

  useEffect(() => {
    dragElement(pieceRef.current)
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
    }
  }

  return (
    <div className="piece" id={piece.id} ref={pieceRef}>
      {
        piece.piece.map((r, x) => {
          return (
            <div key={x} className='row'>
              {
                r.map((c, y) => {
                  if (c === 1) {
                    return (
                      <div
                        key={`${x}-${y}`}
                        style={{
                          width: size,
                          height: size,
                          backgroundColor: piece.color
                      }} />
                    )
                  } else {
                    return (
                      <div
                        key={`${x}-${y}`}
                        style={{
                          width: size,
                          height: size
                      }} />
                    )
                  }
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

const Pieces = () => {

  return (
    <div className="pieces-container">
      <Piece piece={pieceT} />
      <Piece piece={pieceZ} />
      <Piece piece={pieceU} />
      <Piece piece={pieceCorner} />
      <Piece piece={pieceL} />
      <Piece piece={pieceS} />
      <Piece piece={pieceB} />
      <Piece piece={pieceRectangle} />
    </div>
  )
}

export default Pieces