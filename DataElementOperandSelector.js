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

var _TextField = require('material-ui/TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _LinearProgress = require('material-ui/LinearProgress/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _dataElementOperandSelector = require('./dataElementOperandSelector.actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    list: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem'
    },
    pagination: {
        float: 'right'
    },
    textField: {
        marginLeft: '1rem'
    }
};

var DataElementOperandSelector = function (_Component) {
    (0, _inherits3.default)(DataElementOperandSelector, _Component);

    function DataElementOperandSelector(props, context) {
        (0, _classCallCheck3.default)(this, DataElementOperandSelector);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataElementOperandSelector.__proto__ || (0, _getPrototypeOf2.default)(DataElementOperandSelector)).call(this, props, context));

        _this.state = {
            isLoading: true,
            pager: {
                hasNextPage: function hasNextPage() {
                    return false;
                },
                hasPreviousPage: function hasPreviousPage() {
                    return false;
                }
            }
        };

        _this.getNextPage = function () {
            _this.setState({ isLoading: true });
            _this.props.dataElementOperandSelectorActions.getNextPage(_this.state.pager, _this.state.searchValue);
        };

        _this.getPreviousPage = function () {
            _this.setState({ isLoading: true });
            _this.props.dataElementOperandSelectorActions.getPreviousPage(_this.state.pager, _this.state.searchValue);
        };

        _this.searchDataElement = function (event) {
            var value = event.target.value;
            _this.props.dataElementOperandSelectorActions.search(value).subscribe(function () {
                _this.setState({
                    isLoading: false,
                    searchValue: value
                });
            });

            _this.setState({ isLoading: true });
        };

        var i18n = _this.context.d2.i18n;

        i18n.strings.add('search_by_name');

        _this.getTranslation = i18n.getTranslation.bind(i18n);
        return _this;
    }

    (0, _createClass3.default)(DataElementOperandSelector, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.actionSubscriptions = (0, _dataElementOperandSelector.subscribeDataElementActionsToStore)(this.props.dataElementOperandSelectorActions, this.props.dataElementOperandStore);

            if (this.props.dataElementOperandSelectorActions) {
                this.props.dataElementOperandSelectorActions.loadList();
            }

            this.storeObservable = this.props.dataElementOperandStore.do(function (collection) {
                return _this2.setState({ pager: collection.pager });
            }).map(function (collection) {
                return collection.toArray();
            }).map(function (collection) {
                return collection.map(function (item) {
                    return {
                        label: item.displayName,
                        value: item.id
                    };
                });
            }).do(function (value) {
                _this2.setState({ isLoading: false });
                return value;
            });

            this.disposable = this.storeObservable.map(function (collection) {
                return collection.pager;
            }).filter(function (pager) {
                return Boolean(pager);
            }).subscribe(function (pager) {
                _this2.setState({ pager: pager });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.disposable && this.disposable.unsubscribe();
            this.actionSubscriptions.forEach(function (subscription) {
                return subscription.unsubscribe();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'data-element-operand-selector' },
                _react2.default.createElement(
                    'div',
                    { style: styles.pagination },
                    _react2.default.createElement(_d2UiCore.Pagination, {
                        hasNextPage: function hasNextPage() {
                            return _this3.state.pager.hasNextPage();
                        },
                        hasPreviousPage: function hasPreviousPage() {
                            return _this3.state.pager.hasPreviousPage();
                        },
                        onNextPageClick: this.getNextPage,
                        onPreviousPageClick: this.getPreviousPage
                    })
                ),
                _react2.default.createElement(_TextField2.default, {
                    style: styles.textField,
                    hintText: this.getTranslation('search_by_name'),
                    onChange: this.searchDataElement
                }),
                this.state.isLoading && _react2.default.createElement(_LinearProgress2.default, { mode: 'indeterminate' }),
                _react2.default.createElement(_d2UiCore.ListSelectAsync, {
                    size: 12,
                    onItemDoubleClick: this.props.onSelect,
                    source: this.storeObservable,
                    listStyle: this.props.listStyle
                })
            );
        }
    }]);
    return DataElementOperandSelector;
}(_react.Component);

DataElementOperandSelector.propTypes = {
    dataElementOperandSelectorActions: _propTypes2.default.object,
    dataElementOperandStore: _propTypes2.default.object,
    onSelect: _propTypes2.default.func.isRequired,
    listStyle: _propTypes2.default.object
};

DataElementOperandSelector.defaultProps = {
    dataElementOperandSelectorActions: (0, _dataElementOperandSelector.createDataElementOperandActions)(),
    dataElementOperandStore: _d2UiCore.Store.create(),
    listStyle: styles.list
};

DataElementOperandSelector.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = DataElementOperandSelector;