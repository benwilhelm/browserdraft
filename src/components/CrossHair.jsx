import React from 'react'

export default (props) => {
  const { top, bottom, left, right, x, y, scale } = props
  const strokeWidth = 0.25 / scale
  return (
    <g strokeWidth={strokeWidth} stroke={"rgb(0,0,0)"}>
      <line x1={left} y1={y} x2={right} y2={y} />
      <line x1={x} y1={top} x2={x} y2={bottom} />
    </g>
  )
}
