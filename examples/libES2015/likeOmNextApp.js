'use strict';

const reaction = require('../../index'),
      ReactDOM = reaction.ReactDOM,
      React = reaction.React;

class LikeOmNextApp {
  static run() {
    const rootDOMElement = document.getElementById('root');

    const { Component } = React;

    class ClickMe extends Component {
      render() {
        const remount = this.context.remount;

        return (

          <button onClick={function() {
                    counter++;

                    remount();
                  }}
          >
            Click me!
          </button>
        )
      }
    }

    class Counter extends Component {
      render() {
        return (

          <p>
            Count:{this.context.counter}
          </p>
        )
      }
    }

    var counter = 0;
    class Provider extends Component {
      getChildContext(context) {
        const remount = this.remount.bind(this);
        
        return {
          counter: counter,
          remount: remount
        };
      }
      render() {
        return this.props.children;
      }
    }

    ReactDOM.render(
        
      <Provider>
        <Counter />
        <ClickMe />
      </Provider>,
      rootDOMElement
    );
  }
}

module.exports = LikeOmNextApp;
