import './styles.css'
import { useState } from 'react'
import ItemTypes from './ItemTypes'
import Piece from './Piece'

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