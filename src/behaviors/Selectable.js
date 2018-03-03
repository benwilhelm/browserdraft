import React from 'react'
import { connect } from 'react-redux'
import { toggleSelect } from '../store'

const mapState = (state, ownProps) => {
  const style = { ...ownProps.shape.style, cursor: 'pointer'}
  return {
    selected: state.selected.includes(ownProps.shape.id),
    shape: { ...ownProps.shape, style }
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handlers: {
      onClick(e) {
        e.stopPropagation()
        dispatch(toggleSelect(ownProps.shape.id))
      }
    }
  }
}

const Anchor = (props) => {
  const x = props.x - 5
  const y = props.y - 5
  return <rect x={x} y={y} width={10} height={10} />
}

const Selectable = (Component) => {

  return connect(mapState, mapDispatch)((props) => {
    const renderedComponent = new Component(props)
    const anchors = renderedComponent.getAnchors()
    return !props.selected
           ? <Component {...props} />
           : (
             <g onClick={props.onClick}>
               <Component {...props} />
               <g fill="#fff">
                 {anchors.map(
                   (anchor, idx) => <Anchor key={idx} {...anchor} />)}
               </g>
             </g>
           )
  })
}

export default Selectable
