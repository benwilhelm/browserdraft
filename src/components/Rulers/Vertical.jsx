import React from 'react'

export default (props) => {
  const { vbx, vby, vbh, scale, width, tickInterval, labelInterval } = props

  const tickCoords = []
  for (let y = Math.ceil(vby+width); y < Math.floor(vby+vbh); y++) {
    if (y % tickInterval === 0) tickCoords.push(y)
  }

  const labelCoords = []
  for (let y = Math.ceil(vby+width); y < Math.floor(vby+vbh); y++) {
    if (y % labelInterval === 0) labelCoords.push(y)
  }

  const height = Math.max(0, vbh-width)
  return (
    <g>
      <rect x={vbx} y={vby+width} width={width} height={height} />
      <g strokeWidth={0.5/scale}>
        { tickCoords.map((tick, i) =>
          <line x1={vbx + (width/2)}
                x2={vbx + width }
                y1={tick}
                y2={tick}
                key={i}/>
          )
        }
      </g>
      <g stroke="none" fill="#555">
        {
          labelCoords.map((label, i) =>
            <text x={vbx} y={label} fontSize={11/scale} key={i}>{label}</text>
          )
        }
      </g>
    </g>
  )
}
