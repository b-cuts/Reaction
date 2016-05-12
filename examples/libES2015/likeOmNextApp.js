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
              forceUpdate = this.context.forceUpdate;

        const query = {
                key: 'count',
                transaction: function(count) {
                  return count+1;
                }
              },
              queries = [query];

        return (

          <button onClick={function() {
                    parser.mutate(queries);

                    forceUpdate();
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

        const key = 'count',
              query = {
                key: key
              },
              queries = [query],
              results = parser.read(queries),
              result = first(results),
              count = result[key];

        return (

          <p>
            Count:{count}
          </p>
        )
      }
    }

    class Parser {
      constructor() {
        this.state = {
          count: 0
        };
      }

      read(queries) {
        const results = queries.map(function(query) {
          const key = query.key;

          var result = {};

          result[key] = this.state[key];

          return result;
        }.bind(this));

        return results;
      }

      mutate(queries) {
        queries.forEach(function(query) {
          const key = query.key,
                transaction = query.transaction,
                value = this.state[key];

          this.state[key] = transaction(value);
        }.bind(this));
      }
    }

    class Provider extends Component {
      getChildContext() {
        const parser = this.props.parser,
              forceUpdate = this.forceUpdate.bind(this),
              context = {
                parser: parser,
                forceUpdate: forceUpdate
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

function first(array) { return array[0]; }