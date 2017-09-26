import { createStore, combineReducers } from 'redux'

import pointsReducer from './points-reducer'
import linesReducer from './lines-reducer'
import viewportReducer from './viewport-reducer'

import INITIAL_STATE from '../state.json'

const reducers = combineReducers({
  points: pointsReducer,
  lines: linesReducer,
  viewport: viewportReducer,
})

const store = createStore(reducers, INITIAL_STATE)

export default store
