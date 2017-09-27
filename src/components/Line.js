import React from 'react'
import PropTypes from 'prop-types'

import './Line.css'
import shapes from './shapes'
import { angles } from '../libs/angles'

import Angle from './Angle'

const commaize = ({ x, y }) => `${x},${y}`

const glue = points => points.map(commaize).join(' ')

class Line extends React.Component {
  construct() {
    this.points = []
    this.renderInnerLine = this.renderInnerLine.bind(this)
    this.renderAngles = this.renderAngles.bind(this)
  }
  renderAngles() {
    const allAngles = angles(...this.props.points)
    const renderAngle = (point, i) => <Angle key={i} point={point} angle={allAngles[i]} />
    return this.props.points.map(renderAngle)
  }
  renderInnerLine() {
    return <polyline className="inner" points={this.points} />
  }
  render() {
    this.points = glue(this.props.points)
    const { selected } = this.props
    const lineId = `line-${this.props.id}`

    return (<g id={lineId} className="line">
      <polyline className="outer" points={this.points} stroke={this.props.color} />
      {selected && this.renderInnerLine()}
      {selected && this.renderAngles()}
    </g>)
  }
}


Line.propTypes = {
  id: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(PropTypes.shape(shapes.point)).isRequired,
  color: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
}

Line.defaultProps = {
  stack: [],
}

export default Line
