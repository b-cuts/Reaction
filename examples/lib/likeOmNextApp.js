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
            var remount = this.context.remount;

            return React.createElement(
              'button',
              { onClick: function onClick() {
                  counter++;

                  remount();
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
            return React.createElement(
              'p',
              null,
              'Count:',
              this.context.counter
            );
          }
        }]);

        return Counter;
      }(Component);

      var counter = 0;

      var Provider = function (_Component3) {
        _inherits(Provider, _Component3);

        function Provider() {
          _classCallCheck(this, Provider);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(Provider).apply(this, arguments));
        }

        _createClass(Provider, [{
          key: 'getChildContext',
          value: function getChildContext(context) {
            var remount = this.remount.bind(this);

            return {
              counter: counter,
              remount: remount
            };
          }
        }, {
          key: 'render',
          value: function render() {
            return this.props.children;
          }
        }]);

        return Provider;
      }(Component);

      ReactDOM.render(React.createElement(
        Provider,
        null,
        React.createElement(Counter, null),
        React.createElement(ClickMe, null)
      ), rootDOMElement);
    }
  }]);

  return LikeOmNextApp;
}();

module.exports = LikeOmNextApp;