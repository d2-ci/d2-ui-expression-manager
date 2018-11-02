import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField/TextField';

var ExpressionDescription = function (_Component) {
    _inherits(ExpressionDescription, _Component);

    function ExpressionDescription() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ExpressionDescription);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExpressionDescription.__proto__ || _Object$getPrototypeOf(ExpressionDescription)).call.apply(_ref, [this].concat(args))), _this), _this.handleDescriptionChange = function (event) {
            var descriptionValue = event.target.value;
            _this.props.onDescriptionChange(descriptionValue);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ExpressionDescription, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                descriptionLabel = _props.descriptionLabel,
                descriptionValue = _props.descriptionValue,
                onDescriptionChange = _props.onDescriptionChange,
                textFieldProps = _objectWithoutProperties(_props, ['descriptionLabel', 'descriptionValue', 'onDescriptionChange']);

            return React.createElement(
                'div',
                { className: 'expression-description' },
                React.createElement(TextField, _extends({}, textFieldProps, {
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
}(Component);

ExpressionDescription.propTypes = {
    descriptionLabel: PropTypes.string.isRequired,
    descriptionValue: PropTypes.string.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    errorText: PropTypes.string
};

ExpressionDescription.defaultProps = {
    errorText: ''
};

export default ExpressionDescription;