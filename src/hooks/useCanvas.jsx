import { useEffect, useRef } from "react"

const useCanvas = draw => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let count = 0
    let animationId

    draw(ctx, count)


    // const renderer = () => {
    //   count++
    //   draw(ctx, count)
    //   animationId = window.requestAnimationFrame(renderer)
    // }

    // renderer()

    // return () => window.cancelAnimationFrame(animationId)
  }, [draw])

  return canvasRef
}

export default useCanvas