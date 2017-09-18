import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import cssmodules from 'react-css-modules';
import styles from './canvas.cssmodule.sass';

import Node from './Node';
import Track from './Track';
// import Line from './Line';

// const flatten = list => list.reduce((acc, curr) => acc.concat(curr), []);

class Canvas extends React.Component {
  constructor() {
    super();
    this.renderTrack = this.renderTrack.bind(this);
    this.findNode = this.findNode.bind(this);
    this.findLine = this.findLine.bind(this);
  }
  findNode(desiredNodeId) {
    return this.props.nodes.filter(node => node.id === desiredNodeId)[0];
  }
  findLine(desiredLineId) {
    return this.props.lines.filter(line => line.id === desiredLineId)[0];
  }
  renderTrack(track) {
    const points = track.nodes.map(this.findNode);
    const lineColors = track.lines.map(this.findLine).map(l => l.color);
    return <Track key={track.id} points={points} stack={lineColors} />;
  }
  // renderLine(line) {
  //   const tracks = this.props.tracks.filter(track => track.lines.includes(line.id));
  //   const allNodes = flatten(tracks.map(track => track.nodes));
  //   const points = allNodes.map(this.findNode);
  //   return <Line key={line.id} points={points} color={line.color} />;
  // }
  render() {
    const renderNode = node => <Node {...node} key={node.id} />;
    return (
      <svg
        viewBox="-50 -50 200 200"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect x="0" y="0" width="1000" height="1000"/>
        {this.props.nodes.map(renderNode)}
        {this.props.tracks.map(this.renderTrack)}
      </svg>
    );
  }
}

Canvas.displayName = 'Canvas';
Canvas.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  lines: PropTypes.arrayOf(PropTypes.object).isRequired
};
Canvas.defaultProps = {};

const mapStateToProps = state => ({
  nodes: state.nodes,
  tracks: state.tracks,
  lines: state.lines,
});

export default connect(mapStateToProps)(cssmodules(Canvas, styles));
