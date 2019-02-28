'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FlatButton = require('material-ui/FlatButton/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExpressionOperators = function (_Component) {
    (0, _inherits3.default)(ExpressionOperators, _Component);

    function ExpressionOperators() {
        (0, _classCallCheck3.default)(this, ExpressionOperators);
        return (0, _possibleConstructorReturn3.default)(this, (ExpressionOperators.__proto__ || (0, _getPrototypeOf2.default)(ExpressionOperators)).apply(this, arguments));
    }

    (0, _createClass3.default)(ExpressionOperators, [{
        key: 'render',
        value: function render() {
            var classList = (0, _classnames2.default)('expression-operators');

            var operatorButtonStyle = {
                minWidth: 50
            };

            return _react2.default.createElement(
                'div',
                { className: classList },
                _react2.default.createElement(
                    _FlatButton2.default,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick('(') },
                    '('
                ),
                _react2.default.createElement(
                    _FlatButton2.default,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(')') },
                    ')'
                ),
                _react2.default.createElement(
                    _FlatButton2.default,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' * ') },
                    '*'
                ),
                _react2.default.createElement(
                    _FlatButton2.default,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' / ') },
                    '/'
                ),
                _react2.default.createElement(
                    _FlatButton2.default,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' + ') },
                    '+'
                ),
                _react2.default.createElement(
                    _FlatButton2.default,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' - ') },
                    '-'
                ),
                _react2.default.createElement(
                    _FlatButton2.default,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' [days] ') },
                    'Days'
                )
            );
        }
    }, {
        key: 'createOperatorClick',
        value: function createOperatorClick(operatorValue) {
            return function operatorButtonClick() {
                this.props.operatorClicked(operatorValue);
            }.bind(this);
        }
    }]);
    return ExpressionOperators;
}(_react.Component);

ExpressionOperators.propTypes = {
    operatorClicked: _propTypes2.default.func.isRequired
};

exports.default = ExpressionOperators;