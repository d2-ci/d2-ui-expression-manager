import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var ExpressionFormula = function (_Component) {
    _inherits(ExpressionFormula, _Component);

    function ExpressionFormula() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ExpressionFormula);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExpressionFormula.__proto__ || _Object$getPrototypeOf(ExpressionFormula)).call.apply(_ref, [this].concat(args))), _this), _this._handleFomulaChange = function (event) {
            var formulaValue = event.target.value;

            if (_this.props.onFormulaChange) {
                _this.props.onFormulaChange(formulaValue);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ExpressionFormula, [{
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

            return React.createElement(
                'div',
                { className: 'expression-formula' },
                React.createElement('textarea', {
                    onChange: this._handleFomulaChange,
                    value: this.props.formula,
                    style: textAreaStyle
                })
            );
        }
    }]);

    return ExpressionFormula;
}(Component);

ExpressionFormula.propTypes = {
    onFormulaChange: PropTypes.func.isRequired,
    formula: PropTypes.string
};

export default ExpressionFormula;