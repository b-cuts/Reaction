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
        const reconciler = this.context.reconciler;

        const query = {
                key: 'count',
                transaction: function(count) {
                  return count+1;
                }
              },
              queries = [query];

        return (

          <button onClick={function() {
                    reconciler.mutate(queries);
                  }}
          >
            Click me!
          </button>
        )
      }
    }

    class Counter extends Component {
      render() {
        const reconciler = this.context.reconciler;

        const key = 'count',
              query = {
                key: key
              },
              queries = [query],
              results = reconciler.read(queries),
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
      read(state, queries) {
        const results = queries.map(function(query) {
          const key = query.key;

          var result = {};

          result[key] = state[key];

          return result;
        });

        return results;
      }

      mutate(state, queries) {
        queries.forEach(function(query) {
          const key = query.key,
                transaction = query.transaction,
                value = state[key];

          state[key] = transaction(value);
        });
      }
    }

    class Reconciler extends Component {
      getInitialState() {
        return this.props.state;
      }

      getChildContext() {
        function read(queries) {
          return this.props.parser.read(this.state, queries);
        }

        function mutate(queries) {
          this.props.parser.mutate(this.state, queries);

          this.forceUpdate();
        }

        const reconciler = {
                read: read.bind(this),
                mutate: mutate.bind(this)
              },
              childContext = {
                reconciler: reconciler
              };

        return childContext;
      }

      render() {
        return this.props.children;
      }
    }

    const state = {
            count: 0
          },
          parser = new Parser();

    ReactDOM.render(
        
      <Reconciler state={state} parser={parser}>
        <Counter />
        <ClickMe />
      </Reconciler>,
      rootDOMElement
    );
  }
}

module.exports = LikeOmNextApp;

function first(array) { return array[0]; }