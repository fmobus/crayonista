import React from 'react'
import PropTypes from 'prop-types'

import './Angle.css'
import shapes from './shapes'

const Angle = ({ point, angle }) => {
  if (angle === null) { return null }
  const formattedAngle = Number(angle).toFixed(2) + "º"
  return (<g className="angle">
    <text filter="url(#solid)" x={point.x+1} y={point.y+1}>{formattedAngle}</text>
  </g>)
}

Angle.propTypes = {
  point: PropTypes.shape(shapes.point).isRequired,
  angle: PropTypes.number,
}

Angle.defaultProps = {
  angle: null,
}

export default Angle
