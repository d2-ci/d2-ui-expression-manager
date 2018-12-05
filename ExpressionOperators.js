import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import FlatButton from 'material-ui/FlatButton/FlatButton';

var ExpressionOperators = function (_Component) {
    _inherits(ExpressionOperators, _Component);

    function ExpressionOperators() {
        _classCallCheck(this, ExpressionOperators);

        return _possibleConstructorReturn(this, (ExpressionOperators.__proto__ || _Object$getPrototypeOf(ExpressionOperators)).apply(this, arguments));
    }

    _createClass(ExpressionOperators, [{
        key: 'render',
        value: function render() {
            var classList = classes('expression-operators');

            var operatorButtonStyle = {
                minWidth: 50
            };

            return React.createElement(
                'div',
                { className: classList },
                React.createElement(
                    FlatButton,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick('(') },
                    '('
                ),
                React.createElement(
                    FlatButton,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(')') },
                    ')'
                ),
                React.createElement(
                    FlatButton,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' * ') },
                    '*'
                ),
                React.createElement(
                    FlatButton,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' / ') },
                    '/'
                ),
                React.createElement(
                    FlatButton,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' + ') },
                    '+'
                ),
                React.createElement(
                    FlatButton,
                    { style: operatorButtonStyle, onClick: this.createOperatorClick(' - ') },
                    '-'
                ),
                React.createElement(
                    FlatButton,
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
}(Component);

ExpressionOperators.propTypes = {
    operatorClicked: PropTypes.func.isRequired
};

export default ExpressionOperators;