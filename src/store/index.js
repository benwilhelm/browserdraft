import shapes from './_shapes'
import selected from './_selected'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

export * from './_shapes'
export * from './_selected'

export default createStore(combineReducers({shapes, selected}), applyMiddleware(logger))
