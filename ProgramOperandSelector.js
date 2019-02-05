import _Array$from from 'babel-runtime/core-js/array/from';
import _Map from 'babel-runtime/core-js/map';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';

import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

import { ListSelect } from '@dhis2/d2-ui-core';
import DropDownForSchemaReference from './DropDownForSchemaReference';

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
    _inherits(ProgramOperandSelector, _Component);

    function ProgramOperandSelector(props, context) {
        _classCallCheck(this, ProgramOperandSelector);

        var _this = _possibleConstructorReturn(this, (ProgramOperandSelector.__proto__ || _Object$getPrototypeOf(ProgramOperandSelector)).call(this, props, context));

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
                return log.error(error);
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

    _createClass(ProgramOperandSelector, [{
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
                    programAttributes: new _Map(programs.map(function (program) {
                        return [program.id, program.programTrackedEntityAttributes.map(function (ptea) {
                            return {
                                value: ptea.trackedEntityAttribute.id,
                                label: ptea.displayName
                            };
                        }).sort(function (left, right) {
                            return left.label.toLowerCase().localeCompare(right.label.toLowerCase());
                        })];
                    })),
                    programIndicators: new _Map(programs.map(function (program) {
                        return [program.id, _Array$from(program.programIndicators.values ? program.programIndicators.values() : []).map(function (pi) {
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
                return log.error(e);
            });
        }
    }, {
        key: 'renderTab',
        value: function renderTab(tabName, source, onItemDoubleClick, noValueMessage, listLength) {
            return React.createElement(
                Tab,
                { label: this.getTranslation(tabName), style: styles.tabLabel },
                !listLength ? React.createElement(
                    'div',
                    { style: styles.noValueMessageStyle },
                    this.getTranslation(noValueMessage)
                ) : React.createElement(ListSelect, {
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
            return React.createElement(
                Tabs,
                { tabItemContainerStyle: styles.tabItemContainerStyle },
                this.renderTab('program_data_elements', this.state.programDataElementOptions, this.onProgramDataElementSelected, 'no_program_data_elements', this.state.programDataElementOptions.length),
                this.renderTab('program_tracked_entity_attributes', this.state.programTrackedEntityAttributeOptions, this.onProgramTrackedEntityAttributeSelected, 'no_tracked_entity_attributes', this.state.programTrackedEntityAttributeOptions.length),
                this.renderTab('program_indicators', this.state.programIndicatorOptions, this.onProgramIndicatorSelected, 'no_program_indicators', this.state.programIndicatorOptions.length)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { style: styles.dropDownStyle },
                    React.createElement(DropDownForSchemaReference, {
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
}(Component);

ProgramOperandSelector.propTypes = {
    onSelect: PropTypes.func.isRequired
};

ProgramOperandSelector.contextTypes = {
    d2: PropTypes.object
};

export default ProgramOperandSelector;