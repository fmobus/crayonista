import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import cssmodules from 'react-css-modules';
import styles from './canvas.cssmodule.sass';
import shapes from './shapes';
import Point from './Point';
import Line from './Line';
import Viewport from './Viewport';

class Canvas extends React.Component {
  constructor() {
    super();
    this.findPoint = this.findPoint.bind(this);
    this.renderLine = this.renderLine.bind(this);
    this.renderPoint = this.renderPoint.bind(this);
    this.svg = null;
  }
  findPoint(desiredPointId) {
    return this.props.points.filter(node => node.id === desiredPointId)[0];
  }
  renderLine(line) {
    const points = line.points.map(this.findPoint);
    return <Line key={line.id} id={line.id} points={points} color={line.color} />;
  }
  renderPoint(point) {
    const bindingTargets = point.bound.map(this.findPoint);
    return (<Point
      {...point} targets={bindingTargets} key={point.id}
      onSelect={this.props.onSelectPoint}
      onDeselect={this.props.onDeselectPoint}
    />);
  }
  render() {
    const grabRef = (ref) => { this.svg = ref; };
    const handleMouseMove = (ev) => {
      const selected = this.props.selectedPoint;
      if (!selected) { return; }
      const pt = this.svg.createSVGPoint();
      pt.x = ev.clientX;
      pt.y = ev.clientY;
      const np = pt.matrixTransform(this.svg.getScreenCTM().inverse());
      const dx = np.x - selected.x;
      const dy = np.y - selected.y;
      this.props.onMovePoint(selected.id, dx, dy);
      if (!ev.shiftKey) {
        selected.bound.map(p => this.props.onMovePoint(p, dx, dy));
      }
    };
    const handleMouseUp = () => {
      this.props.onDeselectPoint();
    };

    return (
      <svg
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={grabRef}
      >
        <Viewport />
        {this.props.lines.map(this.renderLine)}
        <g id="points">
          {this.props.points.map(this.renderPoint)}
        </g>
      </svg>
    );
  }
}

Canvas.displayName = 'Canvas';
Canvas.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  lines: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPoint: PropTypes.shape(shapes.point),
  onSelectPoint: PropTypes.func.isRequired,
  onDeselectPoint: PropTypes.func.isRequired,
  onMovePoint: PropTypes.func.isRequired,
};
Canvas.defaultProps = {};

const mapStateToProps = state => ({
  points: state.points,
  lines: state.lines,
  selectedPoint: state.points.find(p => p.selected),
});

const mapDispatchToprops = dispatch => ({
  onSelectPoint: (id) => {
    dispatch({ type: 'POINT_SELECTED', id });

  },
  onDeselectPoint: () => {
    dispatch({ type: 'POINT_DESELECTED' });
  },
  onMovePoint: (id, dx, dy) => {
    dispatch({ type: 'POINT_MOVED', id, dx, dy });
  }
});

export default connect(mapStateToProps, mapDispatchToprops)(cssmodules(Canvas, styles));
