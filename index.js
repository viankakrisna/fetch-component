"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _state = require("~/state");

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : subClass.__proto__ = superClass;
}

var Fetch = (function(_React$Component) {
  _inherits(Fetch, _React$Component);

  function Fetch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Fetch);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(
      this,
      (_ref = Fetch.__proto__ || Object.getPrototypeOf(Fetch)).call.apply(
        _ref,
        [this].concat(args)
      )
    ), _this), _this.state = {
      data: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Fetch, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.mounted = true;
        this.fetch(this.props);
      }
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.mounted = false;
      }
    },
    {
      key: "update",
      value: function update() {
        if (this.mounted) {
          this.setState.apply(this, arguments);
        }
      }
    },
    {
      key: "fetch",
      value: function fetch(props) {
        var _this2 = this;

        this.update({ data: getCache(props) });
        if (Array.isArray(props.url)) {
          return Promise
            .all(
              props.url.map(function(url) {
                return global.fetch(url, props.config);
              })
            )
            .then(function(results) {
              return Promise.all(
                results.map(function(res) {
                  return res.json();
                })
              );
            })
            .then(function(data) {
              _this2.update({ data: data, error: false });
            })
            .catch(function(error) {
              _this2.update({ error: error });
            });
        }
        return global
          .fetch(props.url, props.config)
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            _this2.update({ data: data, error: false });
          })
          .catch(function(error) {
            _this2.update({ error: error });
          });
      }
    },
    {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (!(0, _isEqual2.default)(nextProps.url, this.props.url)) {
          this.fetch(nextProps);
        }
      }
    },
    {
      key: "render",
      value: function render() {
        if (this.state.error && this.props.onError) {
          return this.props.onError(this.state.error);
        }

        if (this.props.children) {
          return this.props.children(this.state.data);
        }

        return null;
      }
    }
  ]);

  return Fetch;
})(_react2.default.Component);

exports.default = Fetch;
