import shapes from './_shapes'
import selected from './_selected'
import { combineReducers, createStore } from 'redux'

export * from './_shapes'
export * from './_selected'

export default createStore(combineReducers({shapes, selected}))
