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

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(ReportingRatesSelector, _Component);

    function ReportingRatesSelector(props, context) {
        (0, _classCallCheck3.default)(this, ReportingRatesSelector);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ReportingRatesSelector.__proto__ || (0, _getPrototypeOf2.default)(ReportingRatesSelector)).call(this, props, context));

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

    (0, _createClass3.default)(ReportingRatesSelector, [{
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
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: styles.dropDownStyle },
                    _react2.default.createElement(_d2UiCore.DropDown, {
                        menuItems: reportingRates,
                        value: this.state.selectedReportingRate,
                        onChange: this.onSelectReportingRate
                    })
                ),
                this.state.isLoaded && _react2.default.createElement(_d2UiCore.ListSelect, {
                    onItemDoubleClick: this.onDoubleClickDataSet,
                    source: this.state.dataSets,
                    listStyle: this.props.listStyle,
                    size: 12
                })
            );
        }
    }]);
    return ReportingRatesSelector;
}(_react.Component);

ReportingRatesSelector.propTypes = {
    onSelect: _propTypes2.default.func.isRequired,
    listStyle: _propTypes2.default.object
};

ReportingRatesSelector.defaultProps = {
    listStyle: styles.list
};

ReportingRatesSelector.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = ReportingRatesSelector;