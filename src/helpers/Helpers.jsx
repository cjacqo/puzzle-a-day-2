
// /**
//  * 
//  * @param {integer} s Index of shapes array
//  * @param {integer} f Index between 0 and 1 (0 is not flipped; 1 is flipped)
//  * @param {integer} r Index of shape within array (0 - 4)
//  * @returns array of shape
//  */
// function drawTetromino(s, f, r) {
//   const arr = []
//   const piece = pieces[s][f]
//   for (let y = 0; y < 4; y++) {
//     const innerArr = []
//     for (let x = 0; x < 4; x++) {
//       if (piece[r] & (0x8000 >> (y * 4 + x))) {
//         innerArr.push(1)
//       } else {
//         innerArr.push(0)
//       }
//     }
//     arr.push(innerArr)
//   }
//   return arr
// }

// export {
//   drawTetromino
// }