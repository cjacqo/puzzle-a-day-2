import { useEffect } from "react"
import useCanvas from "../../hooks/useCanvas"

const Canvas = props => {
  const {draw, ...rest} = props
  const canvasRef = useCanvas(draw)

  let mouseDown = (e) => {
    e.preventDefault()

    let startX = parseInt(e.clientX)
    let startY = parseInt(e.clientY)

    console.log(startX, startY)
    
  }

  useEffect(() => {
    canvasRef.current.onmousedown = mouseDown
  }, [canvasRef])

  return <canvas {...rest} ref={canvasRef} />
}

export default Canvas