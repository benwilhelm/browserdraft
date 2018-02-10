import React from 'react'

export default (props) => {
  const { vbx, vby, vbw, scale, width, tickInterval, labelInterval } = props

  const tickCoords = []
  for (let x = Math.ceil(vbx+width); x < Math.floor(vbx+vbw); x++) {
    if (x % tickInterval === 0) tickCoords.push(x)
  }

  const labelCoords = []
  for (let x = Math.ceil(vbx+width); x < Math.floor(vbx+vbw); x++) {
    if (x % labelInterval === 0) labelCoords.push(x)
  }

  const rectWidth = Math.max(0, vbw-width)
  return (
    <g>
      <rect x={vbx+width} y={vby} width={rectWidth} height={width} />
      <g strokeWidth={0.5/scale}>
        { tickCoords.map((tick, i) =>
          <line x1={tick }
                x2={tick }
                y1={vby + (width / 2 ) }
                y2={vby + (width ) }
                key={i}/>
          )
        }
      </g>
      <g stroke="none" fill="#555">
        {
          labelCoords.map((label, i) =>
            <text x={label} y={vby + width/2} fontSize={11/scale} key={i}>{label}</text>
          )
        }
      </g>
    </g>
  )
}
