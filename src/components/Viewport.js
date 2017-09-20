import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './canvas.cssmodule.sass';

const from = min => ({
  upto(max) {
    return Array.from(Array(max - min)).map((_, i) => i + min);
  }
});

class Viewport extends React.Component {
  renderBox() {
    const { x0, y0, x1, y1 } = this.props;
    const width = x1 - x0;
    const height = y1 - y0;
    return <rect x={x0} y={y0} width={width} height={height}/>;
  }
  renderHorizontalLines() {
    const { x0, x1, y0, y1 } = this.props;
    const renderLine = i => (<line key={i} x1={x0} x2={x1} y1={i} y2={i} />);
    return (<g id="grid-horizontal" className={styles.grid}>
      {from(y0).upto(y1).map(renderLine)}
    </g>);
  }
  renderVerticalLines() {
    const { x0, x1, y0, y1 } = this.props;
    const renderLine = i => (<line key={i} x1={i} x2={i} y1={y0} y2={y1} />);
    return (<g id="grid-vertical" className={styles.grid}>
      {from(x0).upto(x1).map(renderLine)}
    </g>);
  }
  render() {
    return (
      <g>
        {this.renderHorizontalLines()}
        {this.renderVerticalLines()}
        {this.renderBox()}
      </g>
    );
  }
}

Viewport.displayName = 'Viewport';
Viewport.propTypes = {
  x0: PropTypes.number.isRequired,
  y0: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  x0: state.viewport.x0,
  y0: state.viewport.y0,
  x1: state.viewport.x1,
  y1: state.viewport.y1,
});

export default connect(mapStateToProps)(Viewport);
