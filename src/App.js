import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import HomePage from './view/homePage.js';
import MovieDetail from './view/movieDetail.js';

class App extends Component {
  render() {
    return (
      <div id="main">
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/movies/:id" component={MovieDetail}></Route>
      </div>
    );
  }
}

export default App;
