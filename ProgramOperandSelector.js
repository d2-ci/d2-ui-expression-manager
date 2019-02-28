'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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

var _Tabs = require('material-ui/Tabs/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('material-ui/Tabs/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _DropDownForSchemaReference = require('./DropDownForSchemaReference');

var _DropDownForSchemaReference2 = _interopRequireDefault(_DropDownForSchemaReference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    listStyle: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem'
    },
    noValueMessageStyle: {
        padding: '1rem'
    },
    tabLabel: {
        color: '#333'
    },
    tabItemContainerStyle: {
        backgroundColor: '#FFF'
    },
    dropDownStyle: {
        margin: '0 1rem'
    }
};

var ProgramOperandSelector = function (_Component) {
    (0, _inherits3.default)(ProgramOperandSelector, _Component);

    function ProgramOperandSelector(props, context) {
        (0, _classCallCheck3.default)(this, ProgramOperandSelector);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProgramOperandSelector.__proto__ || (0, _getPrototypeOf2.default)(ProgramOperandSelector)).call(this, props, context));

        _this.state = {
            programTrackedEntityAttributeOptions: [],
            programIndicatorOptions: [],
            programDataElementOptions: [],
            programMenuItems: []
        };

        _this.onLoadProgramDataOperands = function (event) {
            var api = _this.context.d2.Api.getApi();
            var programId = event.target.value;

            api.get('programDataElements', {
                program: programId,
                fields: 'id,displayName,dimensionItem',
                paging: false,
                order: 'displayName:asc'
            }).then(function (programDataElements) {
                _this.setState({
                    selectedProgramID: programId,
                    programDataElementOptions: programDataElements.programDataElements.map(function (programDataElement) {
                        return {
                            value: programDataElement.dimensionItem,
                            label: programDataElement.displayName
                        };
                    }),
                    programIndicatorOptions: _this.state.programIndicators.get(programId) || [],
                    programTrackedEntityAttributeOptions: _this.state.programAttributes.get(programId) || []
                });
            }).catch(function (error) {
                return _loglevel2.default.error(error);
            });
        };

        _this.onProgramTrackedEntityAttributeSelected = function (trackedEntityAttributeID) {
            var programTrackedEntityAttributeFormula = 'A{' + _this.state.selectedProgramID + '.' + trackedEntityAttributeID + '}';
            _this.props.onSelect(programTrackedEntityAttributeFormula);
        };

        _this.onProgramIndicatorSelected = function (programIndicatorID) {
            var programIndicatorFormula = 'I{' + programIndicatorID + '}';
            _this.props.onSelect(programIndicatorFormula);
        };

        _this.onProgramDataElementSelected = function (programDataElementID) {
            var programDataElementSelected = 'D{' + programDataElementID + '}';
            _this.props.onSelect(programDataElementSelected);
        };

        var i18n = _this.context.d2.i18n;
        i18n.strings.add('please_select_a_program');
        i18n.strings.add('no_tracked_entity_attributes');
        i18n.strings.add('no_program_indicators');
        i18n.strings.add('no_program_data_elements');
        _this.getTranslation = i18n.getTranslation.bind(i18n);
        return _this;
    }

    (0, _createClass3.default)(ProgramOperandSelector, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.context.d2.models.program.list({
                paging: false,
                fields: 'id,displayName,programTrackedEntityAttributes[id,displayName,trackedEntityAttribute],programIndicators[id,displayName,dimensionItem]'
            }).then(function (programCollection) {
                return programCollection.toArray();
            }).then(function (programs) {
                var programMenuItems = programs.map(function (program) {
                    return {
                        payload: program.id,
                        text: program.displayName
                    };
                }).sort(function (left, right) {
                    return left.text.localeCompare(right.text.toLowerCase());
                });

                _this2.setState({
                    programMenuItems: programMenuItems,
                    programAttributes: new _map2.default(programs.map(function (program) {
                        return [program.id, program.programTrackedEntityAttributes.map(function (ptea) {
                            return {
                                value: ptea.trackedEntityAttribute.id,
                                label: ptea.displayName
                            };
                        }).sort(function (left, right) {
                            return left.label.toLowerCase().localeCompare(right.label.toLowerCase());
                        })];
                    })),
                    programIndicators: new _map2.default(programs.map(function (program) {
                        return [program.id, (0, _from2.default)(program.programIndicators.values ? program.programIndicators.values() : []).map(function (pi) {
                            return {
                                value: pi.dimensionItem,
                                label: pi.displayName
                            };
                        }).sort(function (left, right) {
                            return left.label.toLowerCase().localeCompare(right.label.toLowerCase());
                        })];
                    }))
                });
            }).catch(function (e) {
                return _loglevel2.default.error(e);
            });
        }
    }, {
        key: 'renderTab',
        value: function renderTab(tabName, source, onItemDoubleClick, noValueMessage, listLength) {
            return _react2.default.createElement(
                _Tab2.default,
                { label: this.getTranslation(tabName), style: styles.tabLabel },
                !listLength ? _react2.default.createElement(
                    'div',
                    { style: styles.noValueMessageStyle },
                    this.getTranslation(noValueMessage)
                ) : _react2.default.createElement(_d2UiCore.ListSelect, {
                    onItemDoubleClick: onItemDoubleClick,
                    source: source,
                    listStyle: styles.listStyle,
                    size: 10
                })
            );
        }
    }, {
        key: 'renderTabs',
        value: function renderTabs() {
            return _react2.default.createElement(
                _Tabs2.default,
                { tabItemContainerStyle: styles.tabItemContainerStyle },
                this.renderTab('program_data_elements', this.state.programDataElementOptions, this.onProgramDataElementSelected, 'no_program_data_elements', this.state.programDataElementOptions.length),
                this.renderTab('program_tracked_entity_attributes', this.state.programTrackedEntityAttributeOptions, this.onProgramTrackedEntityAttributeSelected, 'no_tracked_entity_attributes', this.state.programTrackedEntityAttributeOptions.length),
                this.renderTab('program_indicators', this.state.programIndicatorOptions, this.onProgramIndicatorSelected, 'no_program_indicators', this.state.programIndicatorOptions.length)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: styles.dropDownStyle },
                    _react2.default.createElement(_DropDownForSchemaReference2.default, {
                        schema: 'program',
                        value: this.state.selectedProgramID,
                        fullWidth: true,
                        onChange: this.onLoadProgramDataOperands,
                        hintText: this.getTranslation('please_select_a_program')
                    })
                ),
                this.state.selectedProgramID ? this.renderTabs() : null
            );
        }
    }]);
    return ProgramOperandSelector;
}(_react.Component);

ProgramOperandSelector.propTypes = {
    onSelect: _propTypes2.default.func.isRequired
};

ProgramOperandSelector.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = ProgramOperandSelector;