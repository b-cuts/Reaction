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
        const parser = this.context.parser,
              remount = this.context.remount;

        return (

          <button onClick={() => {
                    parser.mutate();

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
        const parser = this.context.parser;

        return (

          <p>
            Count:{parser.read()}
          </p>
        )
      }
    }

    class Parser {
      constructor() {
        this.counter = 0;
      }

      read() {
        return this.counter;
      }

      mutate() {
        this.counter++;
      }
    }

    class Provider extends Component {
      getChildContext() {
        const parser = this.props.parser,
              remount = this.remount.bind(this),
              context = {
                parser: parser,
                remount: remount
              };

        return context;
      }
      render() {
        return this.props.children;
      }
    }

    const parser = new Parser();
    ReactDOM.render(
        
      <Provider parser={parser}>
        <Counter />
        <ClickMe />
      </Provider>,
      rootDOMElement
    );
  }
}

module.exports = LikeOmNextApp;
