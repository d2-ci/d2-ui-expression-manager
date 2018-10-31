import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField/TextField';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';

import { ListSelectAsync } from '@dhis2/d2-ui-core';
import { Pagination } from '@dhis2/d2-ui-core';
import { Store } from '@dhis2/d2-ui-core';
import { createDataElementOperandActions, subscribeDataElementActionsToStore } from './dataElementOperandSelector.actions';

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
    _inherits(DataElementOperandSelector, _Component);

    function DataElementOperandSelector(props, context) {
        _classCallCheck(this, DataElementOperandSelector);

        var _this = _possibleConstructorReturn(this, (DataElementOperandSelector.__proto__ || _Object$getPrototypeOf(DataElementOperandSelector)).call(this, props, context));

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

    _createClass(DataElementOperandSelector, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.actionSubscriptions = subscribeDataElementActionsToStore(this.props.dataElementOperandSelectorActions, this.props.dataElementOperandStore);

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

            return React.createElement(
                'div',
                { className: 'data-element-operand-selector' },
                React.createElement(
                    'div',
                    { style: styles.pagination },
                    React.createElement(Pagination, {
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
                React.createElement(TextField, {
                    style: styles.textField,
                    hintText: this.getTranslation('search_by_name'),
                    onChange: this.searchDataElement
                }),
                this.state.isLoading && React.createElement(LinearProgress, { mode: 'indeterminate' }),
                React.createElement(ListSelectAsync, {
                    size: 12,
                    onItemDoubleClick: this.props.onSelect,
                    source: this.storeObservable,
                    listStyle: this.props.listStyle
                })
            );
        }
    }]);

    return DataElementOperandSelector;
}(Component);

DataElementOperandSelector.propTypes = {
    dataElementOperandSelectorActions: PropTypes.object,
    dataElementOperandStore: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    listStyle: PropTypes.object
};

DataElementOperandSelector.defaultProps = {
    dataElementOperandSelectorActions: createDataElementOperandActions(),
    dataElementOperandStore: Store.create(),
    listStyle: styles.list
};

DataElementOperandSelector.contextTypes = {
    d2: PropTypes.object
};

export default DataElementOperandSelector;