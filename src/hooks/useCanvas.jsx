import { useEffect, useRef } from "react"
import { pieceT, pieceU } from "../puzzle/pieces"

const useCanvas = draw => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let count = 0
    let animationId

    pieceT.drawOnCanvas(ctx)
    pieceU.drawOnCanvas(ctx)
    ctx.moveTo(100, 100)


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