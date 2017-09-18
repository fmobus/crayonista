import React from 'react';
import './app.css';

import Canvas from './Canvas';

class AppComponent extends React.Component {
  render() {
    return (
      <Canvas />
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
