import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListSelect } from '@dhis2/d2-ui-core';
import { DropDown } from '@dhis2/d2-ui-core';

var styles = {
    list: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem'
    },
    dropDownStyle: {
        marginLeft: '1rem',
        marginRight: '1rem'
    }
};

var reportingRates = [{ id: 'REPORTING_RATE', displayName: 'Reporting rate' }, { id: 'REPORTING_RATE_ON_TIME', displayName: 'Reporting rate on time' }, { id: 'ACTUAL_REPORTS', displayName: 'Actual reports' }, { id: 'ACTUAL_REPORTS_ON_TIME', displayName: 'Actual reports on time' }, { id: 'EXPECTED_REPORTS', displayName: 'Expected reports' }];

var ReportingRatesSelector = function (_Component) {
    _inherits(ReportingRatesSelector, _Component);

    function ReportingRatesSelector(props, context) {
        _classCallCheck(this, ReportingRatesSelector);

        var _this = _possibleConstructorReturn(this, (ReportingRatesSelector.__proto__ || _Object$getPrototypeOf(ReportingRatesSelector)).call(this, props, context));

        _this.state = {
            selectedReportingRate: 'REPORTING_RATE',
            dataSets: [],
            isLoaded: false
        };

        _this.onSelectReportingRate = function (event) {
            _this.setState({
                selectedReportingRate: event.target.value
            });
        };

        _this.onDoubleClickDataSet = function (dataSetId) {
            var reportingRateFormula = 'R{' + dataSetId + '.' + _this.state.selectedReportingRate + '}';
            _this.props.onSelect(reportingRateFormula);
        };

        var i18n = _this.context.d2.i18n;
        i18n.strings.add('please_select_a_program');
        i18n.strings.add('no_tracked_entity_attributes');
        i18n.strings.add('no_program_indicators');
        i18n.strings.add('no_program_data_elements');
        i18n.strings.add('reporting_rates');

        _this.getTranslation = i18n.getTranslation.bind(i18n);
        return _this;
    }

    _createClass(ReportingRatesSelector, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.context.d2.models.dataSet.list({ paging: false, fields: 'id,displayName' }).then(function (dataSetCollection) {
                return dataSetCollection.toArray();
            }).then(function (dataSets) {
                var dataSetItems = dataSets.map(function (dataSet) {
                    return {
                        value: dataSet.id,
                        label: dataSet.displayName
                    };
                });
                _this2.setState({
                    dataSets: dataSetItems,
                    isLoaded: true
                });
            });
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
                    React.createElement(DropDown, {
                        menuItems: reportingRates,
                        value: this.state.selectedReportingRate,
                        onChange: this.onSelectReportingRate
                    })
                ),
                this.state.isLoaded && React.createElement(ListSelect, {
                    onItemDoubleClick: this.onDoubleClickDataSet,
                    source: this.state.dataSets,
                    listStyle: this.props.listStyle,
                    size: 12
                })
            );
        }
    }]);

    return ReportingRatesSelector;
}(Component);

ReportingRatesSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    listStyle: PropTypes.object
};

ReportingRatesSelector.defaultProps = {
    listStyle: styles.list
};

ReportingRatesSelector.contextTypes = {
    d2: PropTypes.object
};

export default ReportingRatesSelector;