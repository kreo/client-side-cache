/*global describe, it, waitsFor, runs, expect, app, afterEach, $, window, console*/
/*jslint unparam: true */

describe('Cache Interface Load Parameters', function () {

    'use strict';

    afterEach(function () {

        var ready = false;

        runs(function () {
            app.helpers.dom.nuke();
            $('#test-node-script').empty();
            $('#test-node-style').empty();
            $('#test-node-img').removeAttr('src');
            $('#test-node-html').empty();
            $("script.lazyloaded").remove();
            $("style.lazyloaded").remove();
            if (!$("script.lazyloaded").length && !$("style.lazyloaded").length) {
                ready = true;
            }
        });

        waitsFor(function () {
            return !!ready;
        }, 'reset cache and objects', 1000);

    });


    it('Call load with isEnabled param - check setting isEnabled true', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                isEnabled: true
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            expect(instance.storage.isEnabled).toEqual(true);
        });

    });

    it('Call load with isEnabled param - check setting isEnabled false', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                isEnabled: false
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            expect(instance.storage.isEnabled).toEqual(false);
        });

    });

    it('Call load with adapters param - check setting types', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
					types: [
						{type: 'fileSystem', css: true, js: true, html: true, img: true},
						{type: 'indexedDatabase', css: true, js: true, html: true, img: true }
					]
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var length = instance.storage.adapters.types.length;
            expect(length).toEqual(2);
        });

    });

    it('Call load with adapters param - check setting types defaults', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
					types: [
						{type: 'fileSystem'}
					]
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var length = instance.storage.adapters.types.length;
            expect(length).toEqual(1);
            expect(instance.storage.adapter.type).toEqual('fileSystem');
            expect(instance.storage.adapters.types[0].css).toEqual(true);
            expect(instance.storage.adapters.types[0].js).toEqual(true);
            expect(instance.storage.adapters.types[0].html).toEqual(true);
            expect(instance.storage.adapters.types[0].img).toEqual(true);
        });

    });

    it('Call load with adapters param - check setting types arguments', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
					types: [
						{type: 'fileSystem', css: false, js: false, html: false, img: false}
					]
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var length = instance.storage.adapters.types.length;
            expect(length).toEqual(1);
            expect(instance.storage.adapter.type).toEqual('fileSystem');
            expect(instance.storage.adapters.types[0].css).toEqual(false);
            expect(instance.storage.adapters.types[0].js).toEqual(false);
            expect(instance.storage.adapters.types[0].html).toEqual(false);
            expect(instance.storage.adapters.types[0].img).toEqual(false);
        });

    });

    it('Call load with adapters param - check setting preferred type', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
					types: [
						{type: 'fileSystem', css: true, js: true, html: true, img: true},
						{type: 'indexedDatabase', css: true, js: true, html: true, img: true },
                        {type: 'webSqlDatabase', css: true, js: true, html: true, img: true }
					],
                    preferredType: 'webSqlDatabase'
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var length = instance.storage.adapters.types.length;
            expect(length).toEqual(3);
            expect(instance.storage.adapter.type).toEqual('webSqlDatabase');
        });

    });

    it('Call load with adapters param - check setting preferred type with types length 1', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
					types: [
						{type: 'indexedDatabase', css: true, js: true, html: true, img: true }
					],
                    preferredType: 'indexedDatabase'
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var length = instance.storage.adapters.types.length;
            expect(length).toEqual(1);
            expect(instance.storage.adapter.type).toEqual('indexedDatabase');
        });

    });

    it('Call load with adapters param - check setting wrong preferred type', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
					types: [
                        {type: 'webSqlDatabase', css: true, js: true, html: true, img: true }
					],
                    preferredType: 'webSqlDatabase123'
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var length = instance.storage.adapters.types.length;
            expect(length).toEqual(1);
            expect(instance.storage.adapter.type).not.toEqual('webSqlDatabase123');
            expect(instance.storage.adapter.type).toEqual('webSqlDatabase');
        });

    });

    it('Call load with adapters param - check setting file system defaults', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
                    preferredType: 'fileSystem',
					defaults: {
						size: 1 * 1024 * 1024
                    }
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var adapter = instance.storage.adapter.type;
            expect(instance.storage.adapter.type).toEqual('fileSystem');
            expect(instance.storage.adapter.size).toEqual(1 * 1024 * 1024);
        });

    });

    it('Call load with adapters param - check setting indexed database defaults', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
                    preferredType: 'indexedDatabase',
					defaults: {
                        name: 'testname',
						//table: 'testcache', -> buggy?
						version: '2.1',
						//key: 'testkey', readonly

                    }
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var adapter = instance.storage.adapter.type;
            expect(instance.storage.adapter.type).toEqual('indexedDatabase');
            expect(instance.storage.adapter.adapter.name).toEqual('testname');
        });

    });

    it('Call load with adapters param - check setting web sql database defaults', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
                    preferredType: 'webSqlDatabase',
					defaults: {
						version: '2.1'
                    }
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var adapter = instance.storage.adapter.type;
            expect(instance.storage.adapter.type).toEqual('webSqlDatabase');
            expect(instance.storage.adapter.adapter.version).toEqual('2.1');
        });

    });

    it('Call load with adapters param - check setting web storage defaults', function () {

        var instance,
            loadCallback;

        runs(function () {
            app.cache.load([
                {url: "js/lib.js", type: "js"}
            ], function (storage) {
                instance = storage;
                loadCallback = 'success';
            }, {
                adapters: {
                    preferredType: 'webStorage',
					defaults: {
						lifetime: 'session'
                    }
                }
            });
        });

        waitsFor(function () {
            return loadCallback === 'success';
        }, 'cache.storage initialized', 1000);

        runs(function () {
            var data = !!sessionStorage.getItem(JSON.stringify("js/lib.js"));
            expect(instance.storage.adapter.type).toEqual('webStorage');
            expect(data).toEqual(true);

        });

    });
});