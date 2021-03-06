(function (window, module, ng, undefined) {
    'use strict';

    module.provider('Memento', function () {
        var storeProvider = {
            window: 'windowStorage',
            localStorage: 'localStorage',
            webSql: 'webSql',
            indexedDb: 'indexedDb'
        };
        var storageMethod = 'window';

        /*jshint newcap: false */
        var coreProvider = function ($store) {
            return function (target, maxCount) {
                maxCount = parseInt(maxCount, 10) || false;
                var store = new $store(target, maxCount);

                this.canUndo = function () {
                    return store.atTail().then(function (result) {
                        return !result;
                    });
                };

                this.undo = function () {
                    return store.prev().then(function (result) {
                        return result;
                    });
                };

                this.canRedo = function () {
                    return store.atHead().then(function (result) {
                        return !result;
                    });
                };

                this.redo = function () {
                    return store.next().then(function (result) {
                        return result;
                    });
                };

                this.push = function (obj) {
                    return store.put(obj).then(function (result) {
                        return result;
                    });
                };

                this.revert = function () {
                    return store.root().then(function (result) {
                        return result;
                    });
                };
            };
        };
        coreProvider.$inject = [storeProvider[storageMethod]];

        return {
            setStorageMethod: function (_storageMethod) {
                storageMethod = _storageMethod;
                coreProvider.$inject = [storeProvider[storageMethod]];
            },
            $get: coreProvider
        };
    });
})(window, angular.module('Memento', []), angular);