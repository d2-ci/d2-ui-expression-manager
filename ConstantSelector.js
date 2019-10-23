'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rxjs = require('rxjs');

var _lodash = require('lodash');

var _d2UiCore = require('@dhis2/d2-ui-core');

var _dataHelpers = require('./data-helpers');

var constantSelectorProps$ = _rxjs.Observable.fromPromise((0, _dataHelpers.getAllObjectsWithFields)('constant')).map(function (constants) {
    return {
        source: constants.map(function (model) {
            return { value: model.id, label: model.displayName };
        }),
        onItemDoubleClick: function onItemDoubleClick(value) {
            var constFormula = ['C{', value, '}'].join('');

            // `this` is the react component props object
            if ((0, _lodash.isFunction)(this.onSelect)) {
                this.onSelect(constFormula);
            }
        }
    };
});

exports.default = (0, _d2UiCore.withPropsFromObservable)(constantSelectorProps$, _d2UiCore.ListSelectWithLocalSearch);