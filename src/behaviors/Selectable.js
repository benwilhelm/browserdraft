import React from 'react'
import { connect } from 'react-redux'

const mapState = (state, ownProps) => {
  console.log(ownProps.shape.id)
  console.log(state.selected)
  return {
    selected: state.selected.includes(ownProps.shape.id)
  }
}

const Anchor = (props) => {
  const x = props.x - 5
  const y = props.y - 5
  return <rect x={x} y={y} width={10} height={10} />
}

const Selectable = (Component) => {

  return connect(mapState)((props) => {
    const renderedComponent = new Component(props)
    const anchors = renderedComponent.getAnchors()
    return !props.selected
           ? renderedComponent
           : (
             <g>
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
