'use strict';

const reaction = require('../../index'),
      React = reaction.React;

const Component = React.Component;

class StatefulComponent extends Component {
  constructor(state) {
    super();

    this.state = state;
  }
  
  render() {
    debugger
    
    return (

      <p>
        Count:{count}
      </p>  
    )
  }
}

module.exports = StatefulComponent;
