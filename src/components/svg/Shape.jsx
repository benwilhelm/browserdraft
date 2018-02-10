import React from 'react'

export default (props) => {
  const TagName = props.shape.type
  return <TagName {...props.shape.geometry} {...props.shape.style} />
}
