import './App.css'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { pieceT, pieceZ, pieceU, pieceCorner, pieceL, pieceS, pieceB, pieceRectangle } from './puzzle/pieces'
import Canvas from './components/canvas/Canvas'

function App() {
  // const refContainer = useRef(null)

  // useEffect(() => {
  //   const scene = new THREE.Scene()
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  //   const renderer = new THREE.WebGLRenderer()
  //   renderer.setSize(window.innerWidth, window.innerHeight)
  //   refContainer.current && refContainer.current.appendChild(renderer.domElement)

  //   pieceT.drawThree().forEach(c => {
  //     c.forEach(_ => {
  //       scene.add(_)
  //     })
  //   })

  //   camera.position.z = 5
  //   renderer.render(scene, camera)
  // }, [])

  // const draw = (ctx, count) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //   ctx.fillStyle = 'green'
  //   const delta = count % 800
  //   ctx.fillRect(10 + delta, 10, 100, 100)
  // }

  console.log(pieceT.piece)


  const draw = (ctx) => {
    console.log(pieceT.piece)
    const tileSize = 30
    for (let y = 0; y < pieceT.piece.length; y++) {
      for (let x = 0; x < pieceT.piece[y].length; x++) {
        ctx.fillStyle = 'red'
        if (pieceT.piece[y][x] === 1) ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
      }
    }
  }
  
  return (
    <>
      <div className="heading-container">
        <h1>Puzzle a Day</h1>
      </div>

      {/* <div ref={refContainer}></div> */}

      <Canvas
        width='800'
        height='800' />
    </>
  )
}

export default App
