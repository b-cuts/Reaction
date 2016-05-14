'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var reaction = require('../../index'),
    ReactDOM = reaction.ReactDOM,
    React = reaction.React;

var LikeOmNextApp = function () {
  function LikeOmNextApp() {
    _classCallCheck(this, LikeOmNextApp);
  }

  _createClass(LikeOmNextApp, null, [{
    key: 'run',
    value: function run() {
      var rootDOMElement = document.getElementById('root');

      var Component = React.Component;

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

      var Person = function Person(_ref) {
        var name = _ref.name;
        var points = _ref.points;


        return React.createElement(
          'li',
          null,
          'name: ',
          React.createElement(
            'strong',
            null,
            name
          ),
          React.createElement('br', null),
          'points: ',
          React.createElement(
            'strong',
            null,
            points
          )
        );
      };

      var ListOne = function (_Component) {
        _inherits(ListOne, _Component);

        function ListOne() {
          _classCallCheck(this, ListOne);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(ListOne).apply(this, arguments));
        }

        _createClass(ListOne, [{
          key: 'render',
          value: function render() {
            var reconciler = this.context.reconciler;

            var key = 'listOne',
                query = {
              key: key
            },
                result = reconciler.read(query),
                value = result.value,
                items = value; ///

            var persons = items.map(function (item) {
              var name = item.name,
                  points = item.points;

              return React.createElement(Person, { name: name, points: points });
            });

            return React.createElement(
              'ul',
              null,
              persons
            );
          }
        }]);

        return ListOne;
      }(Component);

      var ListTwo = function (_Component2) {
        _inherits(ListTwo, _Component2);

        function ListTwo() {
          _classCallCheck(this, ListTwo);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(ListTwo).apply(this, arguments));
        }

        _createClass(ListTwo, [{
          key: 'render',
          value: function render() {

            return React.createElement('ul', null);
          }
        }]);

        return ListTwo;
      }(Component);

      var Parser = function () {
        function Parser() {
          _classCallCheck(this, Parser);
        }

        _createClass(Parser, [{
          key: 'read',
          value: function read(state, key, params) {
            var value = state[key],
                result = {
              value: value
            };

            return result;
          }
        }, {
          key: 'mutate',
          value: function mutate(state, key, transaction, params) {
            var value = state[key];

            state[key] = transaction(value);
          }
        }]);

        return Parser;
      }();

      var Reconciler = function (_Component3) {
        _inherits(Reconciler, _Component3);

        function Reconciler() {
          _classCallCheck(this, Reconciler);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(Reconciler).apply(this, arguments));
        }

        _createClass(Reconciler, [{
          key: 'getInitialState',
          value: function getInitialState() {
            return this.props.state;
          }
        }, {
          key: 'getChildContext',
          value: function getChildContext() {
            var state = this.state,
                parser = this.props.parser;

            function read(query) {
              var key = query.key;

              return parser.read(state, key);
            }

            function mutate(query) {
              var key = query.key,
                  transaction = query.transaction;

              parser.mutate(state, key, transaction);

              this.forceUpdate();
            }

            var reconciler = {
              read: read.bind(this),
              mutate: mutate.bind(this)
            },
                childContext = {
              reconciler: reconciler
            };

            return childContext;
          }
        }, {
          key: 'render',
          value: function render() {
            return this.props.children;
          }
        }]);

        return Reconciler;
      }(Component);

      var state = {
        listOne: [{ name: 'John', points: 0 }, { name: 'Mary', points: 0 }, { name: 'Bob', points: 0 }],
        listTwo: [{ name: 'Mary', points: 0, age: 27 }, { name: 'Gwen', points: 0 }, { name: 'Jeff', points: 0 }]
      },
          parser = new Parser();

      ReactDOM.render(React.createElement(
        Reconciler,
        { state: state, parser: parser },
        React.createElement(ListOne, null),
        React.createElement(ListTwo, null)
      ), rootDOMElement);
    }
  }]);

  return LikeOmNextApp;
}();

module.exports = LikeOmNextApp;