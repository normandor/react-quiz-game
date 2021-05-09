import './App.css';
import Quiz from './components/quiz.js';
import Menu from './components/menu.js';
import React, { Component } from "react";

class App extends Component {

  render() {
    const qs = require('query-string');
    // eslint-disable-next-line no-restricted-globals
    let module = qs.parse(location.search).module;
    if (typeof module == 'undefined') {
      return (
          <Menu />
      );
    }

    return (
        <Quiz />
    );
  }
}

export default App;
