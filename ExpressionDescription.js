'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _TextField = require('material-ui/TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExpressionDescription = function (_Component) {
    (0, _inherits3.default)(ExpressionDescription, _Component);

    function ExpressionDescription() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ExpressionDescription);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ExpressionDescription.__proto__ || (0, _getPrototypeOf2.default)(ExpressionDescription)).call.apply(_ref, [this].concat(args))), _this), _this.handleDescriptionChange = function (event) {
            var descriptionValue = event.target.value;
            _this.props.onDescriptionChange(descriptionValue);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ExpressionDescription, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                descriptionLabel = _props.descriptionLabel,
                descriptionValue = _props.descriptionValue,
                onDescriptionChange = _props.onDescriptionChange,
                textFieldProps = (0, _objectWithoutProperties3.default)(_props, ['descriptionLabel', 'descriptionValue', 'onDescriptionChange']);


            return _react2.default.createElement(
                'div',
                { className: 'expression-description' },
                _react2.default.createElement(_TextField2.default, (0, _extends3.default)({}, textFieldProps, {
                    value: this.props.descriptionValue,
                    floatingLabelText: this.props.descriptionLabel,
                    onChange: this.handleDescriptionChange,
                    fullWidth: true,
                    errorText: this.props.errorText
                }))
            );
        }
    }]);
    return ExpressionDescription;
}(_react.Component);

ExpressionDescription.propTypes = {
    descriptionLabel: _propTypes2.default.string.isRequired,
    descriptionValue: _propTypes2.default.string.isRequired,
    onDescriptionChange: _propTypes2.default.func.isRequired,
    errorText: _propTypes2.default.string
};

ExpressionDescription.defaultProps = {
    errorText: ''
};

exports.default = ExpressionDescription;