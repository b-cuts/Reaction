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
              };

        return (

          <button onClick={function() {
                    reconciler.mutate(query);
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
              result = reconciler.read(query),
              value = result.value,
              count = value;  ///

        return (

          <p>
            Count:{count}
          </p>
        )
      }
    }

    class Parser {
      read(env, key, params) {
        const state = env.state,
              value = state[key],
              result = {
                value: value
              };

        return result;
      }

      mutate(env, key, transaction, params) {
        const state = env.state,
              value = state[key];

        state[key] = transaction(value);
      }
    }

    class Reconciler extends Component {
      getInitialState() {
        return this.props.state;
      }

      getChildContext() {
        const state = this.state,
              parser = this.props.parser,
              env = {
                state: state
              };

        function read(query) {
          const key = query.key;

          return parser.read(env, key);
        }

        function mutate(query) {
          const key = query.key,
                transaction = query.transaction;

          parser.mutate(env, key, transaction);

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