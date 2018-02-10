import React from 'react'
import CrossHair from './CrossHair.jsx'
import Grid from './Grid.jsx'

const style = {
  backgroundColor: '#fff',
  width: '900px',
  height: '600px',
  margin: '2em auto',
  overflow: 'hidden',
  position: 'relative'
}

class Outer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scale: 1,
      lastclientX : 100,
      lastclientY : 100,
      vbh : 200,
      vbw : 300,
      vbx : 0,
      vby : 0,
      pointer: { x: 0, y: 0}
    }
  }

  componentDidMount() {
    const rect = this.svgElement.getBoundingClientRect()
    this.setState(state => ({
      scale: rect.width / state.vbw
    }))
  }

  _onWheel = (e) => {
    e.preventDefault()
    e.persist()
    requestAnimationFrame(() => {
      const rect = this.svgElement.getBoundingClientRect()
      const zoomOriginX = (e.pageX - rect.left)
      const zoomOriginY = (e.pageY - rect.top)

      const weightLeft  = (zoomOriginX / rect.width)
      const weightTop   = (zoomOriginY / rect.height)

      const aspect = rect.width / rect.height
      let zf = e.deltaY * 0.1

      this.setState(state => {
        const vbw = state.vbw + zf * aspect
        return {
          vbx: state.vbx - (zf * weightLeft * aspect),
          vby: state.vby - (zf * weightTop),
          vbh: state.vbh + zf,
          vbw: vbw,
          scale: rect.width / vbw
        }
      })
    })
  }

  _onMouseDown = (e) => {
    e.preventDefault()
    window.addEventListener('mousemove', this._onDrag)
    window.addEventListener('mouseup', this._onMouseUp)
    this.setState({
      lastclientX: e.clientX,
      lastclientY: e.clientY
    })
  }

  _onDrag = (e) => {
    requestAnimationFrame(() => {
      this.setState(state => {
        const deltaX = (e.clientX - state.lastclientX) / state.scale
        const deltaY = (e.clientY - state.lastclientY) / state.scale
        return {
          lastclientX: e.clientX,
          lastclientY: e.clientY,
          vbx: state.vbx - deltaX,
          vby: state.vby - deltaY,
        }
      })
    })
  }

  _onMouseUp = (e) => {
    window.removeEventListener('mousemove', this._onDrag)
    window.removeEventListener('mouseup', this._onMouseUp)
  }

  _onMouseMove = (e) => {
    const rect = this.svgElement.getBoundingClientRect()
    const xOffset = e.clientX - rect.left
    const yOffset = e.clientY - rect.top
    requestAnimationFrame(() => {
      this.setState(state => ({
        pointer: {
          x: state.vbx + (xOffset / state.scale),
          y: state.vby + (yOffset / state.scale)
        }
      }))
    })
  }


  render() {
    const { vbx, vby, vbh, vbw, scale, pointer } = this.state

    return (
      <div style={style}>
          <svg
            style={{ width: '100%', height: '100%' }}
            viewBox={`${vbx} ${vby} ${vbw} ${vbh}`}
            preserveAspectRatio="xMidYMid meet"
            onWheel={this._onWheel}
            onMouseDown={this._onMouseDown}
            onMouseMove={this._onMouseMove}
            ref={(svgElement) => {this.svgElement = svgElement} }
          >
            <Grid {...this.state} />
            <rect x="-5" y="-5" width="220" height="220" style={{
                strokeWidth: 2,
                stroke: 'black',
                fill: 'none'
              }}
            />
            {this.props.children}

            <CrossHair
              top={vby}
              left={vbx}
              right={vbx+vbw}
              bottom={vby+vbh}
              x={pointer.x}
              y={pointer.y}
              scale={scale}
            />
          </svg>

      </div>
    )
  }
}

export default Outer
