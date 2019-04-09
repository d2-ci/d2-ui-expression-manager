'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.subscribeDataElementActionsToStore = subscribeDataElementActionsToStore;
exports.createDataElementOperandActions = createDataElementOperandActions;

var _rxjs = require('rxjs');

var _d = require('d2');

var _Pager = require('d2/pager/Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFakePager = function createFakePager(response) {
    return (
        // Fake the modelCollection since dataElementOperands do not have a valid uid
        {
            pager: new _Pager2.default(response.pager, {
                list: function list(pager) {
                    var _this = this;

                    return (0, _d.getInstance)().then(function (d2) {
                        if (_this.searchValue) {
                            return d2.Api.getApi().get('dataElementOperands', { page: pager.page, fields: 'id,displayName', filter: ['dataElement.domainType:eq:AGGREGATE', 'name:ilike:' + _this.searchValue], totals: true });
                        }

                        return d2.Api.getApi().get('dataElementOperands', { page: pager.page, fields: 'id,displayName', totals: true, filter: ['dataElement.domainType:eq:AGGREGATE'] });
                    });
                }
            }),
            toArray: function toArray() {
                return response.dataElementOperands;
            }
        }
    );
};

function subscribeDataElementActionsToStore(dataElementOperandSelectorActions, dataElementOperandStore) {
    var loadListSubscription = dataElementOperandSelectorActions.loadList.subscribe(function () {
        (0, _d.getInstance)().then(function (d2) {
            return d2.Api.getApi().get('dataElementOperands', { fields: 'id,displayName', totals: true, filter: ['dataElement.domainType:eq:AGGREGATE'] });
        }).then(createFakePager).then(function (collection) {
            return dataElementOperandStore.setState(collection);
        });
    });

    var searchSubscription = dataElementOperandSelectorActions.search.debounceTime(500).distinctUntilChanged(function (x, y) {
        return x === y;
    }, function (action) {
        return action.data;
    }).map(function (action) {
        var searchPromise = (0, _d.getInstance)().then(function (d2) {
            if (action.data) {
                return d2.Api.getApi().get('dataElementOperands', { fields: 'id,displayName', totals: true, filter: ['dataElement.domainType:eq:AGGREGATE', 'name:ilike:' + action.data] });
            }
            return d2.Api.getApi().get('dataElementOperands', { fields: 'id,displayName', totals: true, filter: ['dataElement.domainType:eq:AGGREGATE'] });
        }).then(createFakePager).then(function (collection) {
            return {
                complete: action.complete,
                error: action.error,
                collection: collection
            };
        });

        return _rxjs.Observable.fromPromise(searchPromise);
    }).concatAll().subscribe(function (actionResult) {
        dataElementOperandStore.setState(actionResult.collection);
        actionResult.complete();
    });

    var getNextPageSubscription = dataElementOperandSelectorActions.getNextPage.subscribe(function (action) {
        var _action$data = (0, _slicedToArray3.default)(action.data, 2),
            pager = _action$data[0],
            searchValue = _action$data[1];

        pager.pagingHandler.searchValue = searchValue;

        pager.getNextPage().then(createFakePager).then(function (collection) {
            return {
                complete: action.complete,
                error: action.error,
                collection: collection
            };
        }).then(function (actionResult) {
            dataElementOperandStore.setState(actionResult.collection);
            actionResult.complete();
        });
    });

    var getPreviousPageSubscription = dataElementOperandSelectorActions.getPreviousPage.subscribe(function (action) {
        var _action$data2 = (0, _slicedToArray3.default)(action.data, 2),
            pager = _action$data2[0],
            searchValue = _action$data2[1];

        pager.pagingHandler.searchValue = searchValue;

        pager.getPreviousPage().then(createFakePager).then(function (collection) {
            return {
                complete: action.complete,
                error: action.error,
                collection: collection
            };
        }).then(function (actionResult) {
            dataElementOperandStore.setState(actionResult.collection);
            actionResult.complete();
        });
    });

    var subscriptions = [];

    subscriptions.push(loadListSubscription);
    subscriptions.push(searchSubscription);
    subscriptions.push(getNextPageSubscription);
    subscriptions.push(getPreviousPageSubscription);

    return subscriptions;
}

function createDataElementOperandActions() {
    return _d2UiCore.Action.createActionsFromNames(['search', 'loadList', 'getNextPage', 'getPreviousPage']);
}