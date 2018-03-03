const selected = [ 'a' ]

const SELECT_ITEM = 'SELECT_ITEM'
const DESELECT_ITEM = 'DESELECT_ITEM'
const TOGGLE_SELECT = 'TOGGLE_SELECT'
const DESELECT_ALL = 'DESELECT_ALL'

export const selectItem = (id) => ({
  type: SELECT_ITEM,
  payload: { id }
})

export const deselectItem = (id) => ({
  type: DESELECT_ITEM,
  payload: {id}
})

export const toggleSelect = (id) => ({
  type: TOGGLE_SELECT,
  payload: {id}
})

export const deselectAll = () => ({
  type: DESELECT_ALL
})

const reducer = (state=selected, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return state.concat(action.payload.id)
    case DESELECT_ITEM:
      return state.filter(id => id !== action.payload.id)
    case DESELECT_ALL:
      return []
    case TOGGLE_SELECT:
      return state.includes(action.payload.id)
             ? state.filter(id => id !== action.payload.id)
             : state.concat(action.payload.id)
    default:
      return state
  }
}

export default reducer
