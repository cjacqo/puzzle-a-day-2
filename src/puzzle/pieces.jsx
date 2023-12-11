// Instantiate Shapes
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

function Tetrominoe(shapes, color, id, x, y) {
  this.shapes = shapes
  this.color = color
  this.id = id
  this.currentFlip = 0
  this.currentRotation = 0
  this.startingPosition = { x, y }

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

const tetrominoeT = new Tetrominoe(shapes[0], 'red', 't', 0, -500)
const tetrominoeZ = new Tetrominoe(shapes[1], 'blue', 'z', 0, -50)
const tetrominoeU = new Tetrominoe(shapes[2], 'green', 'u', 250, 50)
const tetrominoeC = new Tetrominoe(shapes[3], 'orange', 'c', 600, 50)
const tetrominoeL = new Tetrominoe(shapes[4], 'yellow', 'l', 950, 50)
const tetrominoeS = new Tetrominoe(shapes[5], 'purple', 's', 1200, 50)
const tetrominoeB = new Tetrominoe(shapes[6], 'grey', 'b', 1200, -350)
const tetrominoeO = new Tetrominoe(shapes[7], 'pink', 'o', 1200, -600)

export {
  tetrominoeT,
  tetrominoeZ,
  tetrominoeU,
  tetrominoeC,
  tetrominoeL,
  tetrominoeS,
  tetrominoeB,
  tetrominoeO
}