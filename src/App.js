import React, { Component } from 'react';
import './App.css';

import HomePage from './view/homePage.js';

class App extends Component {
  
  render() {

    return (
      <div id="main">
        <HomePage></HomePage>
      </div>
    );
  }
}

export default App;
