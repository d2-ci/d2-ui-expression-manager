import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { Observable } from 'rxjs';

import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import Paper from 'material-ui/Paper/Paper';
import Divider from 'material-ui/Divider';

import ExpressionDescription from './ExpressionDescription';
import ExpressionOperators from './ExpressionOperators';
import ExpressionFormula from './ExpressionFormula';

import OrganisationUnitGroupSelector from './OrganisationUnitGroupSelector';
import DataElementOperandSelector from './DataElementOperandSelector';
import ReportingRatesSelector from './ReportingRatesSelector';
import ProgramOperandSelector from './ProgramOperandSelector';
import ConstantSelector from './ConstantSelector';

import { Heading } from '@dhis2/d2-ui-core';
import { Action } from '@dhis2/d2-ui-core';
import { Row } from '@dhis2/d2-ui-core';
import { Column } from '@dhis2/d2-ui-core';

import { setInstance } from 'd2';

var styles = {
    expressionDescription: {
        padding: '1rem',
        margin: '1rem 0'
    },
    expressionMessage: {
        valid: {
            padding: '1rem',
            color: '#006400'
        },
        invalid: {
            padding: '1rem',
            color: '#8B0000'
        }
    },
    list: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem'
    },
    expressionFormulaWrap: {
        padding: '1rem',
        maxWidth: '650px',
        marginRight: '1rem'
    },
    expressionValueOptionsWrap: {
        minHeight: 400,
        minWidth: 600
    },
    expressionContentWrap: {
        minHeight: 360
    },
    tabItemContainer: {
        backgroundColor: 'rgb(33, 150, 243)'
    },
    tabs: {
        color: 'white'
    },
    divider: {
        padding: '0 1rem 2rem'
    }
};

var ExpressionManager = function (_Component) {
    _inherits(ExpressionManager, _Component);

    function ExpressionManager(props) {
        _classCallCheck(this, ExpressionManager);

        var _this = _possibleConstructorReturn(this, (ExpressionManager.__proto__ || _Object$getPrototypeOf(ExpressionManager)).call(this, props));

        _this.descriptionChange = function (newDescription) {
            _this.setState({
                description: newDescription
            }, function () {
                _this.props.expressionChanged({
                    formula: _this.state.formula,
                    description: _this.state.description,
                    expressionStatus: _this.state.expressionStatus
                });
            });
        };

        _this.formulaChange = function (newFormula) {
            _this.setState({
                formula: newFormula
            }, function () {
                _this.requestExpressionStatus();
            });
        };

        _this.addOperatorToFormula = function (operator) {
            _this.appendToFormula(operator);
        };

        _this.programOperandSelected = function (programFormulaPart) {
            _this.appendToFormula(programFormulaPart);
        };

        _this.appendToFormula = function (partToAppend) {
            _this.setState({
                formula: [_this.state.formula, partToAppend].join('')
            }, function () {
                _this.requestExpressionStatus();
            });
        };

        _this.dataElementOperandSelected = function (dataElementOperandId) {
            var dataElementOperandFormula = ['#{', dataElementOperandId, '}'].join('');

            _this.appendToFormula(dataElementOperandFormula);
        };

        _this.requestExpressionStatus = function () {
            _this.requestExpressionStatusAction(_this.state.formula);
        };

        _this.validateExpression = function (action) {
            var formula = action.data;
            var url = 'expressions/description';

            return Observable.fromPromise(_this.props.d2.Api.getApi().get(url, { expression: formula }));
        };

        _this.state = {
            formula: _this.props.formulaValue,
            description: _this.props.descriptionValue,
            expressionStatus: {
                description: '',
                isValid: false
            }
        };

        // override the d2 instance
        setInstance(_this.props.d2);

        _this.i18n = _this.props.d2.i18n;

        _this.i18n.strings.add('description');
        _this.i18n.strings.add('program_tracked_entity_attributes');
        _this.i18n.strings.add('program_indicators');
        _this.i18n.strings.add('program_data_elements');
        _this.i18n.strings.add('field_is_required');
        _this.i18n.strings.add('organisation_unit_counts'); // shorten to org_unit_counts in maintenance
        _this.i18n.strings.add('reporting_rates');
        _this.i18n.strings.add('data_elements');
        _this.i18n.strings.add('constants');
        _this.i18n.strings.add('programs');

        _this.requestExpressionStatusAction = Action.create('requestExpressionStatus');
        return _this;
    }

    _createClass(ExpressionManager, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                d2: this.props.d2
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            if (!this.props.expressionStatusStore) {
                return true;
            }

            var first = true;

            this.disposable = this.props.expressionStatusStore.subscribe(function (expressionStatus) {
                _this2.setState({
                    expressionStatus: {
                        description: expressionStatus.description,
                        isValid: expressionStatus.status === 'OK',
                        message: expressionStatus.message
                    }
                }, function () {
                    if (first) {
                        first = false;
                        return;
                    }

                    _this2.props.expressionChanged({
                        formula: _this2.state.formula,
                        description: _this2.state.description,
                        expressionStatus: _this2.state.expressionStatus
                    });
                });
            }, function (error) {
                return log.error(error);
            });

            this.expressionStatusDisposable = this.requestExpressionStatusAction.debounceTime(500).map(this.props.validateExpression || this.validateExpression).concatAll().subscribe(function (response) {
                return _this2.props.expressionStatusStore.setState(response);
            }, function (error) {
                return log.error(error);
            });

            if (this.props.formulaValue.trim()) {
                this.requestExpressionStatus();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.disposable && this.disposable.unsubscribe();
            this.expressionStatusDisposable && this.expressionStatusDisposable.unsubscribe();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var isDescriptionValid = function isDescriptionValid() {
                return _this3.state.description && _this3.state.description.trim();
            };

            return React.createElement(
                Column,
                null,
                React.createElement(Heading, { level: 3, text: this.props.titleText }),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Paper,
                        { style: styles.expressionFormulaWrap },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(ExpressionDescription, {
                                descriptionValue: this.state.description,
                                descriptionLabel: this.i18n.getTranslation('description'),
                                onDescriptionChange: this.descriptionChange,
                                errorText: !isDescriptionValid() ? this.i18n.getTranslation('field_is_required') : undefined,
                                onBlur: this.requestExpressionStatus
                            }),
                            React.createElement(ExpressionFormula, {
                                onFormulaChange: this.formulaChange,
                                formula: this.state.formula
                            }),
                            React.createElement(ExpressionOperators, { operatorClicked: this.addOperatorToFormula })
                        )
                    ),
                    React.createElement(
                        Paper,
                        { style: styles.expressionValueOptionsWrap },
                        React.createElement(
                            Tabs,
                            { style: styles.expressionContentWrap, tabItemContainerStyle: styles.tabItemContainer },
                            React.createElement(
                                Tab,
                                { style: styles.tabs, label: this.i18n.getTranslation('data_elements') },
                                React.createElement(DataElementOperandSelector, {
                                    listStyle: styles.list,
                                    onSelect: this.dataElementOperandSelected
                                })
                            ),
                            React.createElement(
                                Tab,
                                { style: styles.tabs, label: this.i18n.getTranslation('programs') },
                                React.createElement(ProgramOperandSelector, {
                                    onSelect: this.programOperandSelected
                                })
                            ),
                            React.createElement(
                                Tab,
                                { style: styles.tabs, label: this.i18n.getTranslation('organisation_unit_counts') },
                                React.createElement(OrganisationUnitGroupSelector, {
                                    listStyle: styles.list,
                                    onSelect: this.appendToFormula
                                })
                            ),
                            React.createElement(
                                Tab,
                                { style: styles.tabs, label: this.i18n.getTranslation('constants') },
                                React.createElement(ConstantSelector, {
                                    listStyle: styles.list,
                                    onSelect: this.appendToFormula
                                })
                            ),
                            React.createElement(
                                Tab,
                                { style: styles.tabs, label: this.i18n.getTranslation('reporting_rates') },
                                React.createElement(ReportingRatesSelector, {
                                    listStyle: styles.list,
                                    onSelect: this.appendToFormula
                                })
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: styles.divider },
                            React.createElement(Divider, null)
                        )
                    )
                ),
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        Paper,
                        { style: styles.expressionDescription },
                        this.state.expressionStatus.description
                    ),
                    React.createElement(
                        'div',
                        { style: this.state.expressionStatus.isValid ? styles.expressionMessage.valid : styles.expressionMessage.invalid
                        },
                        this.state.expressionStatus.message
                    )
                )
            );
        }
    }]);

    return ExpressionManager;
}(Component);

ExpressionManager.propTypes = {
    expressionStatusStore: PropTypes.object.isRequired,
    expressionChanged: PropTypes.func.isRequired,
    descriptionValue: PropTypes.string,
    formulaValue: PropTypes.string,
    titleText: PropTypes.string,
    validateExpression: PropTypes.func
};

ExpressionManager.defaultProps = {
    descriptionValue: '',
    formulaValue: '',
    titleText: ''
};

ExpressionManager.childContextTypes = {
    d2: PropTypes.object
};

export default ExpressionManager;