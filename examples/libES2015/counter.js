'use strict';

const reaction = require('../../index'),
      React = reaction.React;

const Component = React.Component;

class Counter extends Component {
  getInitialState() {
    debugger
    
    return 1;
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
