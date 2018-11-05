import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import { Observable } from 'rxjs';
import { getInstance } from 'd2';
import Pager from 'd2/pager/Pager';
import { Action } from '@dhis2/d2-ui-core';

var createFakePager = function createFakePager(response) {
    return (
        // Fake the modelCollection since dataElementOperands do not have a valid uid
        {
            pager: new Pager(response.pager, {
                list: function list(pager) {
                    var _this = this;

                    return getInstance().then(function (d2) {
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

export function subscribeDataElementActionsToStore(dataElementOperandSelectorActions, dataElementOperandStore) {
    var loadListSubscription = dataElementOperandSelectorActions.loadList.subscribe(function () {
        getInstance().then(function (d2) {
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
        var searchPromise = getInstance().then(function (d2) {
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

        return Observable.fromPromise(searchPromise);
    }).concatAll().subscribe(function (actionResult) {
        dataElementOperandStore.setState(actionResult.collection);
        actionResult.complete();
    });

    var getNextPageSubscription = dataElementOperandSelectorActions.getNextPage.subscribe(function (action) {
        var _action$data = _slicedToArray(action.data, 2),
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
        var _action$data2 = _slicedToArray(action.data, 2),
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

export function createDataElementOperandActions() {
    return Action.createActionsFromNames(['search', 'loadList', 'getNextPage', 'getPreviousPage']);
}