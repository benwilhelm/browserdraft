import React from 'react'

export default (props) => {
  const { vbx, vby, vbw, vbh, scale } = props
  const interval = 100
  const minSpacing = 10

  if (interval * scale < minSpacing) {
    return null
  }

  const left = Math.ceil(vbx)
  const right = Math.floor(vbx+vbw)
  const xs = []
  for (let x=left; x<=right; x++) {
    if (x % interval === 0) {
      xs.push(x)
    }
  }

  const top = Math.ceil(vby)
  const bottom = Math.floor(vby+vbh)
  const ys = []
  for (let y=top; y<=bottom; y++) {
    if (y % interval === 0) {
      ys.push(y)
    }
  }

  const strokeWidth = 0.5 / scale
  const stroke = "rgb(180,180,255)"


  return (
    <g strokeWidth={strokeWidth} stroke={stroke}>
      {xs.map((x, i) => (
        <line key={i} x1={x} x2={x} y1={vby} y2={vby+vbh} />
      ))}
      {ys.map((y, i) => (
        <line key={i} y1={y} y2={y} x1={vbx} x2={vbx+vbw} />
      ))}
    </g>
  )
}
