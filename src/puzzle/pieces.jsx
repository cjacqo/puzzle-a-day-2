import * as THREE from 'three'

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
  constructor(piecesArr, color, id) {
    this.pieces = piecesArr
    this._currentFlip = 0
    this._currentRotation = 0
    
    this._piece = this.drawPiece()
    this._color = color
    this._id = id
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

  get color() {
    return this._color
  }

  get id() {
    return this._id
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

  // Method: Draw Three JS
  drawThree() {
    const shape = []
    console.log(this.piece)
    for (let x = 0; x < this.piece.length; x++) {
      const innerArr = []
      for (let y = 0; y < this.piece[x].length; y++) {
        const isFilled = this.piece[x][y] === 1
        if (isFilled) {
          const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
          const cube = new THREE.Mesh(geometry, material)
          cube.position.x = x
          cube.position.y = y
          innerArr.push(cube)
        }
      }
      shape.push(innerArr)
    }
    console.log(shape)
    return shape
  }

  // Method: Draw on Canvas
  drawOnCanvas(ctx, xCoord, yCoord) {
    const tileSize = 30
    ctx.beginPath()
    for (let x = 0; x < this.piece.length; x++) {
      for (let y = 0; y < this.piece[x].length; y++) {
        ctx.fillStyle = 'red'
        // if (this.piece[x][y] === 1) ctx.fillRect(y * tileSize, x * tileSize, tileSize, tileSize)
        if (this.piece[x][y] === 1) ctx.rect((y * tileSize) + yCoord, (x * tileSize) + xCoord, tileSize, tileSize)
      }
    }
    ctx.moveTo(xCoord, yCoord)
    ctx.stroke()
  }

  // Method: Rotate Piece Forward
  rotatePieceForward() {
    this.currentRotation =(this._currentRotation + 1) % 4
    this.currentPiece = this.drawPiece()
    return this
  }

  // Method: Rotate Piece Backward
  rotatePieceBackward() {
    this.currentRotation = this._currentRotation - 1
    if (this._currentRotation < 0) this._currentRotation = 3
    this.currentPiece = this.drawPiece()
    return this
  }

  // Method: Flip Piece
  flipPiece() {
    this.currentFlip = (this._currentFlip + 1) % 2
    this.currentPiece = this.drawPiece()
    return this
  }
}

// Instantiate Pieces
const pieceT = new Piece(pieces[0], 'red', 't')
const pieceZ = new Piece(pieces[1], 'blue', 'z')
const pieceU = new Piece(pieces[2], 'green', 'u')
const pieceCorner = new Piece(pieces[3], 'orange', 'corner')
const pieceL = new Piece(pieces[4], 'yellow', 'l')
const pieceS = new Piece(pieces[5], 'purple', 's')
const pieceB = new Piece(pieces[6], 'grey', 'b')
const pieceRectangle = new Piece(pieces[7], 'pink', 'rectangle')


function Shape(hex, rows, cols) {
  this.hex = hex
  this.rows = rows
  this.cols = cols
}

const shapes = [
  [ // T
    [ // Flip 1
      new Shape('BA', 4, 2),
      new Shape('F2', 2, 4),
      new Shape('5D', 4, 2),
      new Shape('4F', 2, 4)
    ],
    [ // Flip 2
      new Shape('75', 4, 2),
      new Shape('2F', 2, 4),
      new Shape('AE', 4, 2),
      new Shape('F4', 2, 4)
    ]
  ],
  [ // Z
    [ // Flip 1
      new Shape('AD', 4, 2),
      new Shape('7C', 2, 4),
      new Shape('B5', 4, 2),
      new Shape('3E', 2, 4)
    ],
    [ // Flip 2
      new Shape('5E', 4, 2),
      new Shape('C7', 2, 4),
      new Shape('7A', 4, 2),
      new Shape('E3', 2, 4)
    ]
  ],
  [ // U
    [ // Flip 1
      new Shape('178', 3, 3),
      new Shape('D3', 3, 3),
      new Shape('1E8', 3, 3),
      new Shape('CB', 3, 3)
    ],
    [ // Flip 2
      new Shape('1E8', 3, 3),
      new Shape('CB', 3, 3),
      new Shape('178', 3, 3),
      new Shape('D3', 3, 3)
    ]
  ],
  [ // C
    [ // Flip 1
      new Shape('1E4', 3, 3),
      new Shape('1C9', 3, 3),
      new Shape('4F', 3, 3),
      new Shape('127', 3, 3)
    ],
    [ // Flip 2
      new Shape('1C9', 3, 3),
      new Shape('1E4', 3, 3),
      new Shape('127', 3, 3),
      new Shape('4F', 3, 3)
    ]
  ],
  [ // L
    [ // Flip 1
      new Shape('AB', 4, 2),
      new Shape('F8', 2, 4),
      new Shape('D5', 4, 2),
      new Shape('1F', 2, 4)
    ],
    [ // Flip 2
      new Shape('57', 4, 2),
      new Shape('8F', 2, 4),
      new Shape('EA', 4, 2),
      new Shape('F1', 2, 4)
    ]
  ],
  [ // S
    [ // Flip 1
      new Shape('7C', 3, 3),
      new Shape('193', 3, 3)
    ],
    [ // Flip 2
      new Shape('139', 3, 3),
      new Shape('D6', 3, 3)
    ]
  ],
  [ // B
    [ // Flip 1
      new Shape('1F', 3, 2),
      new Shape('37', 2, 3),
      new Shape('3E', 3, 2),
      new Shape('3B', 2, 3)
    ],
    [ // Flip 2
      new Shape('2F', 3, 2),
      new Shape('3E', 2, 3),
      new Shape('3D', 3, 2),
      new Shape('1F', 2, 3)
    ]
  ],
  [ // O
    [ // Flip 1
      new Shape('3F', 2, 3),
      new Shape('3F', 3, 2)
    ],
    [ // Flip 2
      new Shape('3F', 2, 3),
      new Shape('3F', 3, 2)
    ]
  ]
]

function Tetrominoe(shapes, color, id) {
  this.shapes = shapes
  this.color = color
  this.id = id
  this.currentFlip = 0
  this.currentRotation = 0

  this.flip = function() {
    this.currentFlip = (this.currentFlip + 1) % 2
    convertHexToShape()
    return this
  }

  this.rotateForward = function() {
    this.currentRotation =(this.currentRotation + 1) % this.shapes[0].length
    convertHexToShape()
    return this
  }

  this.rotateBackward = function() {
    this.currentRotation = this.currentRotation - 1
    if (this.currentRotation < 0) this.currentRotation = this.shapes[0].length - 1
    convertHexToShape()
    return this
  }

  const convertHexToShape = () => {
    const { hex, rows, cols } = this.shapes[this.currentFlip][this.currentRotation]

    // Convert hex value to a binary string using 'parseInt' with a radix of 16
    // The '.padStart(8, '0')' ensures that the binary string is rows * cols digits long
    const binaryString = parseInt(hex, 16).toString(2).padStart(rows * cols, '0')
    // Convert the string into an array of characters and map each character  to a number
    const binaryArray = Array.from(binaryString).map(Number)
    
    // Empty array to create the shape array
    const shapeArr = []
    // Based on number of rows and columns of the desired shape, convert binaryArray to a 2d array
    for (let i = 0; i < rows; i++) {
      shapeArr.push(binaryArray.slice(i * cols, (i + 1) * cols))
    }

    this.currentShape = shapeArr
  }

  convertHexToShape()
}
// Getter function for shape array in tetrominoe
Object.defineProperty(Tetrominoe.prototype, 'shape', {
  get: function() {
    return this.currentShape
  }
})

const tetrominoeT = new Tetrominoe(shapes[0], 'red', 't')
const tetrominoeZ = new Tetrominoe(shapes[1], 'blue', 'z')
const tetrominoeU = new Tetrominoe(shapes[2], 'green', 'u')
const tetrominoeC = new Tetrominoe(shapes[3], 'orange', 'c')
const tetrominoeL = new Tetrominoe(shapes[4], 'yellow', 'l')
const tetrominoeS = new Tetrominoe(shapes[5], 'purple', 's')
const tetrominoeB = new Tetrominoe(shapes[6], 'grey', 'b')
const tetrominoeO = new Tetrominoe(shapes[7], 'grey', 'o')

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