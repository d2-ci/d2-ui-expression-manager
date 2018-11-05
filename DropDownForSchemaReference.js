import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from '@dhis2/d2-ui-core';
import { DropDown } from '@dhis2/d2-ui-core';

var DropDownForSchemaReference = function (_Component) {
    _inherits(DropDownForSchemaReference, _Component);

    function DropDownForSchemaReference() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DropDownForSchemaReference);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropDownForSchemaReference.__proto__ || _Object$getPrototypeOf(DropDownForSchemaReference)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isLoading: true,
            options: []
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DropDownForSchemaReference, [{
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
                selectProps = _objectWithoutProperties(_props, ['schema']);

            return this.isLoading ? React.createElement(CircularProgress, null) : React.createElement(DropDown, _extends({
                menuItems: this.state.options
            }, selectProps));
        }
    }]);

    return DropDownForSchemaReference;
}(Component);

DropDownForSchemaReference.propTypes = {
    schema: PropTypes.string.isRequired
};

DropDownForSchemaReference.contextTypes = {
    d2: PropTypes.object
};

export default DropDownForSchemaReference;