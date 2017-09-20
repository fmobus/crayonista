import React from 'react';
import PropTypes from 'prop-types';

import shapes from './shapes';
import styles from './canvas.cssmodule.sass';

const commaize = ({x, y}) => `${x},${y}`;

const glue = points => points.map(commaize).join(' ');

class Line extends React.Component {
  render() {
    const points = glue(this.props.points);
    const lineId = `line-${this.props.id}`;

    return (<g id={lineId}>
      <polyline className={styles.line} points={points} stroke={this.props.color}/>
    </g>);
  }
}


Line.propTypes = {
  id: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(PropTypes.shape(shapes.point)).isRequired,
  color: PropTypes.string.isRequired,
};

Line.defaultProps = {
  stack: [],
};

export default Line;
