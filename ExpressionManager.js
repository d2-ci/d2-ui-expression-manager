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

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _rxjs = require('rxjs');

var _Tabs = require('material-ui/Tabs/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('material-ui/Tabs/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Paper = require('material-ui/Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _ExpressionDescription = require('./ExpressionDescription');

var _ExpressionDescription2 = _interopRequireDefault(_ExpressionDescription);

var _ExpressionOperators = require('./ExpressionOperators');

var _ExpressionOperators2 = _interopRequireDefault(_ExpressionOperators);

var _ExpressionFormula = require('./ExpressionFormula');

var _ExpressionFormula2 = _interopRequireDefault(_ExpressionFormula);

var _OrganisationUnitGroupSelector = require('./OrganisationUnitGroupSelector');

var _OrganisationUnitGroupSelector2 = _interopRequireDefault(_OrganisationUnitGroupSelector);

var _DataElementOperandSelector = require('./DataElementOperandSelector');

var _DataElementOperandSelector2 = _interopRequireDefault(_DataElementOperandSelector);

var _ReportingRatesSelector = require('./ReportingRatesSelector');

var _ReportingRatesSelector2 = _interopRequireDefault(_ReportingRatesSelector);

var _ProgramOperandSelector = require('./ProgramOperandSelector');

var _ProgramOperandSelector2 = _interopRequireDefault(_ProgramOperandSelector);

var _ConstantSelector = require('./ConstantSelector');

var _ConstantSelector2 = _interopRequireDefault(_ConstantSelector);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _d = require('d2');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(ExpressionManager, _Component);

    function ExpressionManager(props) {
        (0, _classCallCheck3.default)(this, ExpressionManager);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ExpressionManager.__proto__ || (0, _getPrototypeOf2.default)(ExpressionManager)).call(this, props));

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

        _this.state = {
            formula: _this.props.formulaValue,
            description: _this.props.descriptionValue,
            expressionStatus: {
                description: '',
                isValid: false
            }
        };

        // override the d2 instance
        (0, _d.setInstance)(_this.props.d2);

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

        _this.requestExpressionStatusAction = _d2UiCore.Action.create('requestExpressionStatus');
        return _this;
    }

    (0, _createClass3.default)(ExpressionManager, [{
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
                return _loglevel2.default.error(error);
            });

            this.expressionStatusDisposable = this.requestExpressionStatusAction.debounceTime(500).map(function (action) {
                var formula = action.data;
                var url = 'expressions/description';

                return _rxjs.Observable.fromPromise(_this2.props.d2.Api.getApi().get(url, { expression: formula }));
            }).concatAll().subscribe(function (response) {
                return _this2.props.expressionStatusStore.setState(response);
            }, function (error) {
                return _loglevel2.default.error(error);
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

            return _react2.default.createElement(
                _d2UiCore.Column,
                null,
                _react2.default.createElement(_d2UiCore.Heading, { level: 3, text: this.props.titleText }),
                _react2.default.createElement(
                    _d2UiCore.Row,
                    null,
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: styles.expressionFormulaWrap },
                        _react2.default.createElement(
                            _d2UiCore.Column,
                            null,
                            _react2.default.createElement(_ExpressionDescription2.default, {
                                descriptionValue: this.state.description,
                                descriptionLabel: this.i18n.getTranslation('description'),
                                onDescriptionChange: this.descriptionChange,
                                errorText: !isDescriptionValid() ? this.i18n.getTranslation('field_is_required') : undefined,
                                onBlur: this.requestExpressionStatus
                            }),
                            _react2.default.createElement(_ExpressionFormula2.default, {
                                onFormulaChange: this.formulaChange,
                                formula: this.state.formula
                            }),
                            _react2.default.createElement(_ExpressionOperators2.default, { operatorClicked: this.addOperatorToFormula })
                        )
                    ),
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: styles.expressionValueOptionsWrap },
                        _react2.default.createElement(
                            _Tabs2.default,
                            { style: styles.expressionContentWrap, tabItemContainerStyle: styles.tabItemContainer },
                            _react2.default.createElement(
                                _Tab2.default,
                                { style: styles.tabs, label: this.i18n.getTranslation('data_elements') },
                                _react2.default.createElement(_DataElementOperandSelector2.default, {
                                    listStyle: styles.list,
                                    onSelect: this.dataElementOperandSelected
                                })
                            ),
                            _react2.default.createElement(
                                _Tab2.default,
                                { style: styles.tabs, label: this.i18n.getTranslation('programs') },
                                _react2.default.createElement(_ProgramOperandSelector2.default, {
                                    onSelect: this.programOperandSelected
                                })
                            ),
                            _react2.default.createElement(
                                _Tab2.default,
                                { style: styles.tabs, label: this.i18n.getTranslation('organisation_unit_counts') },
                                _react2.default.createElement(_OrganisationUnitGroupSelector2.default, {
                                    listStyle: styles.list,
                                    onSelect: this.appendToFormula
                                })
                            ),
                            _react2.default.createElement(
                                _Tab2.default,
                                { style: styles.tabs, label: this.i18n.getTranslation('constants') },
                                _react2.default.createElement(_ConstantSelector2.default, {
                                    listStyle: styles.list,
                                    onSelect: this.appendToFormula
                                })
                            ),
                            _react2.default.createElement(
                                _Tab2.default,
                                { style: styles.tabs, label: this.i18n.getTranslation('reporting_rates') },
                                _react2.default.createElement(_ReportingRatesSelector2.default, {
                                    listStyle: styles.list,
                                    onSelect: this.appendToFormula
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: styles.divider },
                            _react2.default.createElement(_Divider2.default, null)
                        )
                    )
                ),
                _react2.default.createElement(
                    _d2UiCore.Column,
                    null,
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: styles.expressionDescription },
                        this.state.expressionStatus.description
                    ),
                    _react2.default.createElement(
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
}(_react.Component);

ExpressionManager.propTypes = {
    expressionStatusStore: _propTypes2.default.object.isRequired,
    expressionChanged: _propTypes2.default.func.isRequired,
    descriptionValue: _propTypes2.default.string,
    formulaValue: _propTypes2.default.string,
    titleText: _propTypes2.default.string
};

ExpressionManager.defaultProps = {
    descriptionValue: '',
    formulaValue: '',
    titleText: ''
};

ExpressionManager.childContextTypes = {
    d2: _propTypes2.default.object
};

exports.default = ExpressionManager;