import React from 'react';
import PropTypes from 'prop-types';

import styles from './canvas.cssmodule.sass';

class Node extends React.Component {
  render() {
    const { x, y, id } = this.props;
    const handleClick = () => { console.log(this.props); };
    return (
      <circle className={styles.node} cx={x} cy={y} r="3" onClick={handleClick}/>
    );
  }
}

Node.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Node;
