import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Point.css'
import shapes from './shapes'

class Point extends React.Component {
  constructor() {
    super()
    this.renderBinding = this.renderBinding.bind(this)
  }
  renderBinding(target) {
    const { x: x1, y: y1, id: id1 } = this.props
    const { x: x2, y: y2, id: id2 } = target
    const handleRemoveBind = () => this.props.onRemoveBind(id1, id2)
    const key = `binding-${id1}-${id2}`
    if (id1 > id2) { return null }
    return (<line
      className="binding"
      key={key} x1={x1} y1={y1} x2={x2} y2={y2}
      onClick={handleRemoveBind}
    />)
  }
  render() {
    const { x, y, id } = this.props
    const selected = this.props.selected
    const handleMouseDown = ev => { this.props.onSelect(id); ev.stopPropagation() }
    const handleMouseUp = ev => this.props.onDeselect()
    const key = `point-${id}`
    const classes = classnames("point", { "selected": selected })

    return (<g key={key}>
      <circle
        className={classes}
        cx={x}
        cy={y}
        r={0.4}
        onMouseDown={handleMouseDown}
      />
      {this.props.targets.map(this.renderBinding)}
    </g>)
  }
}

Point.propTypes = {
  ...shapes.point,
  selected: PropTypes.bool,
  targets: PropTypes.arrayOf(PropTypes.shape(shapes.point)).isRequired,
  id: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onRemoveBind: PropTypes.func.isRequired,
}

Point.defaultProps = {
  selected: false,
}

export default Point
