import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import Canvas from './Canvas'
import './App.css'
import defaultStore from '../reducers'

const App = ({ store }) => (
  <Provider store={store}>
    <Canvas />
  </Provider>
)

App.propTypes = {
  store: PropTypes.object,
}

App.defaultProps = {
  store: defaultStore,
}

export default App
