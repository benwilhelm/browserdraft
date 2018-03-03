import React from 'react'

export default (props) => {
  const { top, bottom, left, right, x, y, scale } = props
  const strokeWidth = 0.25 / scale
  const boxWidth = 10 / scale
  const offset = boxWidth / 2
  return (
    <g strokeWidth={strokeWidth} stroke={"rgb(0,0,0)"} fill='none'>
      <line x1={left} y1={y} x2={x-offset} y2={y} />
      <line x1={x+offset} y1={y} x2={right} y2={y} />
      <line x1={x} y1={top} x2={x} y2={y-offset} />
      <line x1={x} y1={y+offset} x2={x} y2={bottom} />

      <line x1={x-offset} y1={y-offset} x2={x-offset} y2={y+offset} />
      <line x1={x-offset} y1={y+offset} x2={x+offset} y2={y+offset} />
      <line x1={x+offset} y1={y-offset} x2={x+offset} y2={y+offset} />
      <line x1={x-offset} y1={y-offset} x2={x+offset} y2={y-offset} />
    </g>
  )
}
