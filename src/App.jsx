import './App.css'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { pieceT, pieceZ, pieceU, pieceCorner, pieceL, pieceS, pieceB, pieceRectangle } from './puzzle/pieces'

function App() {
  const refContainer = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    refContainer.current && refContainer.current.appendChild(renderer.domElement)

    pieceT.drawThree().forEach(c => {
      c.forEach(_ => {
        scene.add(_)
      })
    })

    camera.position.z = 5
    renderer.render(scene, camera)
  }, [])
  
  return (
    <>
      <div className="heading-container">
        <h1>Puzzle a Day</h1>
      </div>

      <div ref={refContainer}></div>
    </>
  )
}

export default App
