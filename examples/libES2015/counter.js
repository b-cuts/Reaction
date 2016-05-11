'use strict';

const reaction = require('../../index'),
      React = reaction.React;

const StatefulComponent = require('./statefulComponent');

class Counter extends StatefulComponent {
  constructor(state) {
    super(state);
  }
  
  render() {
    debugger

    return (

      <p>
        Count:{this.state}
      </p>  
    )
  }
}

module.exports = Counter;
