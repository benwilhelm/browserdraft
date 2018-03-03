import React from 'react'
import CrossHair from './CrossHair.jsx'
import Grid from './Grid.jsx'
import Rulers from './Rulers/index.jsx'
import ModelSpace from './ModelSpace.jsx'
import { deselectAll } from '../store'
import { connect } from 'react-redux'

class WorkSpace extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scale: 1,
      lastClientX : 0,
      lastClientY : 0,
      previousClientX : 0,
      previousClientY : 0,
      vbh : 0,
      vbw : 0,
      vbx : 0,
      vby : 0,
      pointer: { x: 0, y: 0},
      style: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        margin: 0,
        overflow: 'hidden',
        position: 'relative'
      }
    }
  }

  componentDidMount() {
    const rect = this.svgElement.getBoundingClientRect()

    window.addEventListener('keydown', this._onSpaceDown)
    this.setState(state => ({
      vbw: rect.width,
      vbh: rect.height,
      vbx: -(rect.width / 2),
      vby: -(rect.height / 2),
      scale: 1
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
      let zf = e.deltaY

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

  _onSpaceDown = (e) => {
    if (e.keyCode === 32) {
      window.removeEventListener('keydown', this._onSpaceDown)
      this.setState(state => ({
        style: {...state.style, cursor: 'move'}
      }))

      window.addEventListener('mousemove', this._onDrag)
      window.addEventListener('keyup', this._onSpaceUp)
    }
  }

  _onSpaceUp = (e) => {
    if (e.keyCode === 32) {
      window.removeEventListener('keyup', this._onSpaceUp)
      window.removeEventListener('mousemove', this._onDrag)
      this.setState(state => ({
        style: {...state.style, cursor: 'auto'}
      }))
      window.addEventListener('keydown', this._onSpaceDown)
    }
  }

  _onMouseDown = (e) => {
    e.preventDefault()
  }

  _onDrag = (e) => {
    requestAnimationFrame(() => {
      this.setState(state => {
        const deltaX = (e.clientX - state.previousClientX) / state.scale
        const deltaY = (e.clientY - state.previousClientY) / state.scale
        return {
          vbx: state.vbx - deltaX,
          vby: state.vby - deltaY,
        }
      })
    })
  }

  _onMouseMove = (e) => {
    e.persist()
    const rect = this.svgElement.getBoundingClientRect()
    const xOffset = e.clientX - rect.left
    const yOffset = e.clientY - rect.top
    requestAnimationFrame(() => {
      this.setState(state => ({
        previousClientX: state.lastClientX,
        previousClientY: state.lastClientY,
        lastClientX: e.clientX,
        lastClientY: e.clientY,
        pointer: {
          x: state.vbx + (xOffset / state.scale),
          y: state.vby + (yOffset / state.scale)
        }
      }))
    })
  }


  render() {
    const { vbx, vby, vbh, vbw, scale, pointer, style } = this.state

    return (
      <div style={style} onClick={this.props.handleBackgroundClick}>
          <svg
            style={{ width: '100%', height: '100%' }}
            viewBox={`${vbx} ${vby} ${vbw} ${vbh}`}
            preserveAspectRatio="xMidYMid meet"
            onWheel={this._onWheel}
            onMouseMove={this._onMouseMove}
            onMouseDown={this._onMouseDown}
            ref={(svgElement) => {this.svgElement = svgElement} }
          >

            <Grid {...this.state}  onClick={() => console.log('click?')} />

            <ModelSpace x={vbx} y={vby} width={vbw} height={vbh} />

            <CrossHair
              top={vby}
              left={vbx}
              right={vbx+vbw}
              bottom={vby+vbh}
              x={pointer.x}
              y={pointer.y}
              scale={scale}
            />
            <Rulers {...this.state} />
          </svg>

      </div>
    )
  }
}

const mapState = () => ({})

const mapDispatch = (dispatch) => ({
  handleBackgroundClick(e) {
    dispatch(deselectAll())
  }
})

export default connect(mapState, mapDispatch)(WorkSpace)
