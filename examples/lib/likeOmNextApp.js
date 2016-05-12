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

      var ClickMe = function (_Component) {
        _inherits(ClickMe, _Component);

        function ClickMe() {
          _classCallCheck(this, ClickMe);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(ClickMe).apply(this, arguments));
        }

        _createClass(ClickMe, [{
          key: 'render',
          value: function render() {
            var reconciler = this.context.reconciler;

            var query = {
              key: 'count',
              transaction: function transaction(count) {
                return count + 1;
              }
            };

            return React.createElement(
              'button',
              { onClick: function onClick() {
                  reconciler.mutate(query);
                }
              },
              'Click me!'
            );
          }
        }]);

        return ClickMe;
      }(Component);

      var Counter = function (_Component2) {
        _inherits(Counter, _Component2);

        function Counter() {
          _classCallCheck(this, Counter);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(Counter).apply(this, arguments));
        }

        _createClass(Counter, [{
          key: 'render',
          value: function render() {
            var reconciler = this.context.reconciler;

            var key = 'count',
                query = {
              key: key
            },
                result = reconciler.read(query),
                value = result.value,
                count = value; ///

            return React.createElement(
              'p',
              null,
              'Count:',
              count
            );
          }
        }]);

        return Counter;
      }(Component);

      var Parser = function () {
        function Parser() {
          _classCallCheck(this, Parser);
        }

        _createClass(Parser, [{
          key: 'read',
          value: function read(env, key, params) {
            var state = env.state,
                value = state[key],
                result = {
              value: value
            };

            return result;
          }
        }, {
          key: 'mutate',
          value: function mutate(env, key, transaction, params) {
            var state = env.state,
                value = state[key];

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
                parser = this.props.parser,
                env = {
              state: state
            };

            function read(query) {
              var key = query.key;

              return parser.read(env, key);
            }

            function mutate(query) {
              var key = query.key,
                  transaction = query.transaction;

              parser.mutate(env, key, transaction);

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
        count: 0
      },
          parser = new Parser();

      ReactDOM.render(React.createElement(
        Reconciler,
        { state: state, parser: parser },
        React.createElement(Counter, null),
        React.createElement(ClickMe, null)
      ), rootDOMElement);
    }
  }]);

  return LikeOmNextApp;
}();

module.exports = LikeOmNextApp;

function first(array) {
  return array[0];
}