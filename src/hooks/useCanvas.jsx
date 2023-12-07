import { useEffect, useRef } from "react"
// import { pieceB, pieceCorner, pieceL, pieceRectangle, pieceS, pieceT, pieceU, pieceZ } from "../puzzle/pieces"

const useCanvas = draw => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let count = 0
    let animationId

    // pieceT.drawOnCanvas(ctx, 1, 0)
    // pieceU.drawOnCanvas(ctx, 1, 70)
    // pieceZ.drawOnCanvas(ctx, 1, 170)
    // pieceCorner.drawOnCanvas(ctx, 1, 270)
    // pieceL.drawOnCanvas(ctx, 1, 370)
    // pieceS.drawOnCanvas(ctx, 1, 470)
    // pieceB.drawOnCanvas(ctx, 1, 570)
    // pieceRectangle.drawOnCanvas(ctx, 1, 670)

    // draw(ctx, count)    


    // const renderer = () => {
    //   count++
    //   draw(ctx, count)
    //   animationId = window.requestAnimationFrame(renderer)
    // }

    // renderer()

    // return () => window.cancelAnimationFrame(animationId)
  }, [])
  
  return canvasRef
}

export default useCanvas