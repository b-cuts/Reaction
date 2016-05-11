'use strict';

const reaction = require('../../index'),
      ReactDOM = reaction.ReactDOM,
      React = reaction.React;

const Counter = require('./counter');

class LikeOmNextApp {
  static run() {
    const rootDOMElement = document.getElementById('root');

    ReactDOM.render(
        
      <Counter />,
      rootDOMElement
    );
  }
}

module.exports = LikeOmNextApp;
