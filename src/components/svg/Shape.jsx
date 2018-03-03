import React from 'react'
import Selectable from '../../behaviors/Selectable'


const getShapeAnchors = (shape) => {
  const geo = shape.geometry
  switch(shape.type.toLowerCase()) {
    case 'rect':
      return [
        {x: geo.x, y: geo.y},
        {x: geo.x + geo.width, y: geo.y},
        {x: geo.x + geo.width, y: geo.y + geo.height},
        {x: geo.x, y: geo.y + geo.height},
      ]
    case 'line':
      return [
        {x: geo.x1, y: geo.y1},
        {x: geo.x2, y: geo.y2},
      ]
    default:
      return []
  }
}

class Shape extends React.Component {

  getAnchors() {
    return getShapeAnchors(this.props.shape)
  }

  render() {
    const { shape } = this.props
    const TagName = shape.type
    return <TagName {...shape.geometry} {...shape.style} />
  }
}

export default Selectable(Shape)
