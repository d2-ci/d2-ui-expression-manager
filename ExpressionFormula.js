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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExpressionFormula = function (_Component) {
    (0, _inherits3.default)(ExpressionFormula, _Component);

    function ExpressionFormula() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ExpressionFormula);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ExpressionFormula.__proto__ || (0, _getPrototypeOf2.default)(ExpressionFormula)).call.apply(_ref, [this].concat(args))), _this), _this._handleFomulaChange = function (event) {
            var formulaValue = event.target.value;

            if (_this.props.onFormulaChange) {
                _this.props.onFormulaChange(formulaValue);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ExpressionFormula, [{
        key: 'render',
        value: function render() {
            var textAreaStyle = {
                margin: 0,
                width: '100%',
                height: 200,
                border: '1px solid #DDD',
                padding: '1rem',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box'
            };

            return _react2.default.createElement(
                'div',
                { className: 'expression-formula' },
                _react2.default.createElement('textarea', {
                    onChange: this._handleFomulaChange,
                    value: this.props.formula,
                    style: textAreaStyle
                })
            );
        }
    }]);
    return ExpressionFormula;
}(_react.Component);

ExpressionFormula.propTypes = {
    onFormulaChange: _propTypes2.default.func.isRequired,
    formula: _propTypes2.default.string
};

exports.default = ExpressionFormula;