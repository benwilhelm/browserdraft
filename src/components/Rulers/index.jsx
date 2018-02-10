import React from 'react'
import RulerHorizontal from './Horizontal.jsx'
import RulerVertical from './Vertical.jsx'

const RULER_WIDTH = 20
const TICK_INTERVAL = 10
const LABEL_INTERVAL = 100

export default (props) => {

  const { vbx, vby, scale } = props
  return (
    <g fill="#f8f8f8" stroke="#666" strokeWidth={1/scale}>
      <rect x={vbx} y={vby} width={RULER_WIDTH/scale} height={RULER_WIDTH/scale} />
      <RulerVertical {...props}
        width={RULER_WIDTH/scale}
        tickInterval={TICK_INTERVAL}
        labelInterval={LABEL_INTERVAL}
      />
      <RulerHorizontal {...props}
        width={RULER_WIDTH/scale}
        tickInterval={TICK_INTERVAL}
        labelInterval={LABEL_INTERVAL}
      />
    </g>
  )
}
