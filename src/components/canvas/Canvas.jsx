import useCanvas from "../../hooks/useCanvas"

const Canvas = props => {
  const {draw, ...rest} = props
  const canvasRef = useCanvas(draw)

  return <canvas {...rest} ref={canvasRef} />
}

export default Canvas