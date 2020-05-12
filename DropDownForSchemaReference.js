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

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropDownForSchemaReference = function (_Component) {
    (0, _inherits3.default)(DropDownForSchemaReference, _Component);

    function DropDownForSchemaReference() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DropDownForSchemaReference);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DropDownForSchemaReference.__proto__ || (0, _getPrototypeOf2.default)(DropDownForSchemaReference)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isLoading: true,
            options: []
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DropDownForSchemaReference, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var schema = this.getSchema(); // getSchema returns a d2.schema (modelDefinition object)

            schema.list({ paging: false, fields: 'displayName,id' }).then(function (collection) {
                return collection.toArray();
            }).then(function (options) {
                return _this2.setState({ options: options, isLoading: false });
            }).catch(function () {
                return _this2.setState({ isLoading: false });
            });
        }

        /**
         * Gets a d2 modelDefinition for the `schema` prop.
         *
         * @returns {ModelDefinition}
         * @throws When the `schema` is not a valid schema on the `d2.models` object.
         */

    }, {
        key: 'getSchema',
        value: function getSchema() {
            var _this3 = this;

            var d2 = this.context.d2;
            var isSchemaAvailable = function isSchemaAvailable() {
                return _this3.props.schema && d2.models[_this3.props.schema];
            };

            if (isSchemaAvailable()) {
                return d2.models[this.props.schema];
            }

            throw new Error(this.props.schema + ' is not a valid schema name on the d2.models object. Perhaps you forgot to load the schema or the schema does not exist.');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                schema = _props.schema,
                selectProps = (0, _objectWithoutProperties3.default)(_props, ['schema']);

            return this.isLoading ? _react2.default.createElement(_d2UiCore.CircularProgress, null) : _react2.default.createElement(_d2UiCore.DropDown, (0, _extends3.default)({
                menuItems: this.state.options
            }, selectProps));
        }
    }]);
    return DropDownForSchemaReference;
}(_react.Component);

DropDownForSchemaReference.propTypes = {
    schema: _propTypes2.default.string.isRequired
};

DropDownForSchemaReference.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = DropDownForSchemaReference;