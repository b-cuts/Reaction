'use strict';

const reaction = require('../../index'),
      ReactDOM = reaction.ReactDOM,
      React = reaction.React;

class LikeOmNextApp {
  static run() {
    const rootDOMElement = document.getElementById('root');

    const { Component } = React;

    // class ClickMe extends Component {
    //   render() {
    //     const reconciler = this.context.reconciler;
    //
    //     const query = {
    //             key: 'count',
    //             transaction: function(count) {
    //               return count+1;
    //             }
    //           };
    //
    //     return (
    //
    //       <button onClick={function() {
    //                 reconciler.mutate(query);
    //               }}
    //       >
    //         Click me!
    //       </button>
    //     )
    //   }
    // }

    // class Counter extends Component {
    //   render() {
    //     const reconciler = this.context.reconciler;
    //
    //     const key = 'count',
    //           query = {
    //             key: key
    //           },
    //           result = reconciler.read(query),
    //           value = result.value,
    //           count = value;  ///
    //
    //     return (
    //
    //       <p>
    //         Count:{count}
    //       </p>
    //     )
    //   }
    // }

    const Person = ({name, points}) => {

      return (

        <li>
          name: <strong>{name}</strong>
          <br/>
          points: <strong>{points}</strong>
        </li>
      );
    };

    class ListOne extends Component {
      render() {
        const reconciler = this.context.reconciler;

        const key = 'listOne',
              query = {
                key: key
              },
              result = reconciler.read(query),
              value = result.value,
              items = value;  ///

        var persons = items.map(function(item) {
          const name = item.name,
                points = item.points;

          return (

            <Person name={name} points={points} />
          );
        });

        return (

          <ul>
            {persons}
          </ul>
        );
      }
    }

    class ListTwo extends Component {
      render() {

        return (

          <ul>

          </ul>
        );
      }
    }

    class Parser {
      read(state, key, params) {
        const value = state[key],
              result = {
                value: value
              };

        return result;
      }

      mutate(state, key, transaction, params) {
        const value = state[key];

        state[key] = transaction(value);
      }
    }

    class Reconciler extends Component {
      getInitialState() {
        return this.props.state;
      }

      getChildContext() {
        const state = this.state,
              parser = this.props.parser;

        function read(query) {
          const key = query.key;

          return parser.read(state, key);
        }

        function mutate(query) {
          const key = query.key,
                transaction = query.transaction;

          parser.mutate(state, key, transaction);

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
            listOne: [
              {name: 'John', points: 0},
              {name: 'Mary', points: 0},
              {name: 'Bob', points: 0}
            ],
            listTwo: [
              {name: 'Mary', points: 0, age: 27},
              {name: 'Gwen', points: 0},
              {name: 'Jeff', points: 0}
            ]
          },
          parser = new Parser();

    ReactDOM.render(
        
      <Reconciler state={state} parser={parser}>
        <ListOne />
        <ListTwo />
      </Reconciler>,
      rootDOMElement
    );
  }
}

module.exports = LikeOmNextApp;
