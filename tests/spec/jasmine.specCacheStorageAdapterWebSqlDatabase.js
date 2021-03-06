/*global describe, it, waitsFor, runs, expect, app, afterEach, $, window, console*/
/*jslint unparam: true */

describe('Cache Storage Adapter Web SQL Database', function () {

    'use strict';

    var storageAdapter = app.cache.storage.adapter.webSqlDatabase,
        isSupported = new storageAdapter().isSupported(),
        path = '';

    if (window.__karma__ !== undefined) {
        path += 'base/';
    }

    afterEach(function () {

        var ready = false;

        runs(function () {
            app.helpers.dom.nuke();
            $('#test-node-script').empty();
            $('#test-node-script').removeAttr('asnyc type class');
            $('script.lazyloaded').remove();
            if (!$('script.lazyloaded').length) {
                ready = true;
            }
        });

        waitsFor(function () {
            return !!ready;
        }, 'reset cache and objects', 1000);

    });


    it('Initialize storage adapter', function () {

        var instance,
            adapter = new storageAdapter();

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            expect(instance).not.toEqual(undefined);
        });
    });

    it('Initialize storage adapter - check without open callback', function () {

        var adapter = new storageAdapter();

        runs(function () {
            adapter.open();
        });

        waitsFor(function () {
            return adapter.adapter !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            if (isSupported && adapter.adapter !== null) {
                expect(adapter.adapter).not.toEqual(undefined);
            } else {
                expect(true).toEqual(true);
            }
        });
    });

    it('Call create - basically', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.create('jasmine-test', '{test: "test-content"}', function (success) {
                interfaceCallback = success;
            });
        });

        waitsFor(function () {
            return interfaceCallback !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            expect(interfaceCallback).not.toEqual(undefined);
        });
    });

    it('Call create - without callback argument', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.create('jasmine-test', '{test: "test-content"}');
            adapter.read('jasmine-test', function (data) {
                interfaceCallback = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            expect(interfaceCallback).not.toEqual(undefined);
        });
    });

    it('Call read - basically', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.read('jasmine-test', function (data) {
                interfaceCallback = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            if (isSupported && adapter.adapter !== null) {
                expect(interfaceCallback).toEqual('{test: "test-content"}');
            } else {
                expect(true).toEqual(true);
            }
        });
    });

    it('Call read - check false result whit non-existing resource', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.read('jasmine-testxyz', function (data) {
                interfaceCallback = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            expect(interfaceCallback).toEqual(false);
        });
    });

    it('Call read - without callback argument', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.read('jasmine-test');
        });

        runs(function () {
            expect(interfaceCallback).toEqual(undefined);
        });
    });

    it('Call update - basically', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback,
            interfaceCallback2;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.update('jasmine-test', '{test: "test-content2"}', function (data) {
                interfaceCallback = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            adapter.read('jasmine-test', function (data) {
                interfaceCallback2 = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback2 !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            if (isSupported && adapter.adapter !== null) {
                expect(interfaceCallback2).toEqual('{test: "test-content2"}');
            } else {
                expect(true).toEqual(true);
            }
        });
    });

    it('Call update - without callback argument', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback,
            interfaceCallback2;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.update('jasmine-test', '{test: "test-content2"}');
            adapter.read('jasmine-test', function (data) {
                interfaceCallback2 = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback2 !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            if (isSupported && adapter.adapter !== null) {
                expect(interfaceCallback2).toEqual('{test: "test-content2"}');
            } else {
                expect(true).toEqual(true);
            }
        });
    });

    it('Call remove - basically', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback,
            interfaceCallback2;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.remove('jasmine-test', function (data) {
                interfaceCallback = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            adapter.read('jasmine-test', function (data) {
                interfaceCallback2 = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback2 !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            expect(interfaceCallback2).toEqual(false);
        });
    });

    it('Call remove - without callback argument', function () {

        var instance,
            adapter = new storageAdapter(),
            interfaceCallback,
            interfaceCallback2;

        runs(function () {
            adapter.open(function (callback) {
                instance = callback;
            });
        });

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage.adapter callback', 1000);

        runs(function () {
            adapter.remove('jasmine-test');
            adapter.read('jasmine-test', function (data) {
                interfaceCallback2 = data;
            });
        });

        waitsFor(function () {
            return interfaceCallback2 !== undefined;
        }, 'adapter.create callback', 1000);

        runs(function () {
            expect(interfaceCallback2).toEqual(false);
        });
    });

});
