// Tetrominoe Pieces
const pieces = [
  [                                     // Broken t
    [ 0x4644, 0xF200, 0x2262, 0x4F00 ], // Flip 1
    [ 0x2622, 0xF400, 0x4464, 0x2F00 ]  // Flip 2
  ],
  [                                     // Z
    [ 0x4462, 0x7C00, 0x4622, 0x3E00 ], // Flip 1
    [ 0x2264, 0xE300, 0x2644, 0xC700 ]  // Flip 2
  ],
  [                                     // U
    [ 0x5700, 0x6460, 0x7500, 0x3130 ], // Flip 1
    [ 0x5700, 0x3130, 0x7500, 0x6460 ]  // Flip 2
  ],
  [                                     // Corner
    [ 0xE880, 0x7110, 0x1170, 0x88E0 ], // Flip 1
    [ 0x7110, 0xE880, 0x88E0, 0x1170 ]  // Flip 2
  ],
  [                                     // L
    [ 0x1F00, 0x4446, 0xF800, 0x6222 ], // Flip 1
    [ 0x8F00, 0x6444, 0xF100, 0x2226 ]  // Flip 2
  ],
  [                                     // S
    [ 0x1740, 0x6230, 0x1740, 0x6230 ], // Flip 1
    [ 0x4710, 0x3260, 0x4710, 0x3260 ]  // Flip 2
  ],
  [                                     // B
    [ 0x2660, 0x6700, 0x6640, 0x7300 ], // Flip 1
    [ 0x4660, 0x3700, 0x6620, 0x7600 ]  // Flip 2
  ],
  [                                     // Rectangle
    [ 0x7700, 0x6660, 0x7700, 0x6660 ], // Flip 1
    [ 0x7700, 0x6660, 0x7700, 0x6660 ]  // Flip 2
  ]
]

class Piece {
  constructor(piecesArr) {
    this.pieces = piecesArr
    this._currentFlip = 0
    this._currentRotation = 0
    
    this._piece = this.drawPiece()
  }

  // Setters
  set currentFlip(f) {
    if (f > 1 || f < 0) this._currentFlip = 0
    else this._currentFlip = f
    this.drawPiece()
  }

  set currentRotation(r) {
    this._currentRotation = r
    this.drawPiece()
  }

  set currentPiece(pieceArr) {
    this._piece = pieceArr
  }

  // Getters
  get piece() {
    return this._piece
  }

  // Method: Draw hexadecimal into an array
  drawPiece() {
    const arr = []
    for (let y = 0; y < 4; y++) {
      const innerArr = []
      for (let x = 0; x < 4; x++) {
        if (this.pieces[this._currentFlip][this._currentRotation] & (0x8000 >> (y * 4 + x))) {
          innerArr.push(1)
        } else {
          innerArr.push(0)
        }
      }
      arr.push(innerArr)
    }
    return arr
  }

  // Method: Rotate Piece Forward
  rotatePieceForward() {
    this.currentRotation =(this._currentRotation + 1) % 4
    this.currentPiece = this.drawPiece()
  }

  // Method: Rotate Piece Backward
  rotatePieceBackward() {
    this.currentRotation = this._currentRotation - 1
    if (this._currentRotation < 0) this._currentRotation = 3
    this.currentPiece = this.drawPiece()
  }

  // Method: Flip Piece
  flipPiece() {
    this.currentFlip = (this._currentFlip + 1) % 2
    this.currentPiece = this.drawPiece()
  }
}

// Instantiate Pieces
const pieceT = new Piece(pieces[0])
const pieceZ = new Piece(pieces[1])
const pieceU = new Piece(pieces[2])
const pieceCorner = new Piece(pieces[3])
const pieceL = new Piece(pieces[4])
const pieceS = new Piece(pieces[5])
const pieceB = new Piece(pieces[6])
const pieceRectangle = new Piece(pieces[7])

export {
  pieceT,
  pieceZ,
  pieceU,
  pieceCorner,
  pieceL,
  pieceS,
  pieceB,
  pieceRectangle
}