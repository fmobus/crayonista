import React from 'react';
import PropTypes from 'prop-types';

import styles from './canvas.cssmodule.sass';
import { buffer } from '../libs/geometry';

const commaize = ({x, y}) => `${x},${y}`;

const glue = points => points.map(commaize).join(' ');

class Track extends React.Component {
  constructor() {
    super();
    this.renderLine = this.renderLine.bind(this);
  }
  renderLine(color, idx) {
    const stackSize = this.props.stack.length;
    const delta = -(stackSize / 2) + idx;
    const points = glue(buffer(this.props.points, delta));
    return (
      <polyline key={idx} className={styles.line} points={points} stroke={color}/>
    );
  }
  render() {
    const points = glue(this.props.points);

    return (
      <g>
        <polyline className={styles.track} points={points} />
        {this.props.stack.map(this.renderLine)}
      </g>
    );
  }
}

const point = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

Track.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape(point)).isRequired,
  stack: PropTypes.arrayOf(PropTypes.string),
};

Track.defaultProps = {
  stack: [],
};

export default Track;
