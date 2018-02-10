const shapes = [
  {
    type: "rect",
    geometry: {
      x      : 100,
      y      : 100,
      width  : 300,
      height : 400,
    },
    style: {}
  },{
    type: "rect",
    geometry: {
      x      : 400,
      y      : 0,
      width  : 300,
      height : 400,
      rx     : 10,
      ry     : 10,
    },
    style: {
      strokeWidth: 4
    }
  },{
    type: "line",
    geometry: {
      x1: -10,
      y1: -100,
      x2: -100,
      y2: 200,
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
      fill: "rgb(0,0,0)"
    }
  }
]



const reducer = (state=shapes, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default reducer
