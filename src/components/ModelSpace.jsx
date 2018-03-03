import React from 'react'
import { connect } from 'react-redux'
import Shape from './svg/Shape.jsx'

const ModelSpace = (props) => {
  const shapes = props.shapes || []
  const { x, y, width, height } = props
  return (
    <svg x={x} y={y} width={width} height={height} viewBox={`${x} ${y} ${width} ${height}`}>
      <g strokeWidth="1" stroke="#000" fill='rgba(255,255,255,0)'>
        {shapes.map((shape, idx) => <Shape key={idx} shape={shape} />)}
      </g>
    </svg>
  )
}

const mapStateToProps = (state) => ({
  shapes: state.shapes
})

export default connect(mapStateToProps)(ModelSpace)
