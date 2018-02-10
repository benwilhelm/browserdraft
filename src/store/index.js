import shapes from './_shapes'
import { combineReducers, createStore } from 'redux'

export * from './_shapes'

export default createStore(combineReducers({shapes}))
