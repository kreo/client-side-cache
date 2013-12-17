/*global describe, it, waitsFor, runs, expect, app*/
/*jslint unparam: true */

describe('Cache Controller Load Single Css', function () {

    'use strict';

    afterEach(function () {
    
        var ready = false;
    
        runs(function () {
            app.helpers.dom._destroy();
            $('#test-node-style').empty();
            $("style.lazyloaded").remove();
            if (!$("style.lazyloaded").length && $('#test-node-style').is(':empty')) {
                ready = true;
            }
        });
    
        waitsFor(function(){
            return !!ready;
        }, 'reset cache and objects', 1000);
    
    });

    //afterEach(function () {
    //    return true;
    //});
    
    it('Call load with one css resource argument (url, type) - check load callback function', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "css"}
            ], function () {
                loadCallback = 'success';
            });
        });
        
        waitsFor(function () {
            return loadCallback !== undefined && !!$('head style').length;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect(loadCallback).toEqual('success');
        });
    });

    it('Call load with one css resource argument (url, type, loaded) - check resource loaded callback', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "css", loaded: function () {
                    loadCallback = true;
                }}
            ]);
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect(loadCallback).toEqual(true);
        });
    });

    it('Call load with one css resource argument (url, type, loaded) - check resource loaded callback data', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "css", loaded: function (data) {
                    loadCallback = !!data;
                }}
            ]);
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect(loadCallback).toEqual(true);
        });
    });

    it('Call load with one css resource argument (url, type) - check dom append', function () {

        var ready = false,
            instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;

        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "css"}
            ], function () {
                loadCallback = true;
            });
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache loaded callback', 1000);
        
        runs(function () {
            expect($('head')).toContain('style');
        });
    });
    
    it('Call load with one css resource argument (url, type) - check dom append and lazyload class added', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "css"}
            ], function () {
                loadCallback = true;
            });
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect($('head')).toContain('style.lazyloaded');
        });
    });
    
    it('Call load with one css resource argument (url, type, node) - check node id append', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "css", node: {id: 'test-node-style'}}
            ], function () {
                loadCallback = true;
            });
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect($('#test-node-style')).not.toBeEmpty();
        });
    });

    it('Call load with one css resource argument (url, type, node) - check node dom append', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "css", node: {dom: $('#test-node-style')[0]}}
            ], function () {
                loadCallback = true;
            });
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect($('#test-node-style')).not.toBeEmpty();
        });
    });

    it('Call load with one css resource argument (url, type) - check callback with wrong path', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src123/css/app.css", type: "css"}
            ], function () {
                loadCallback = true;
            });
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect(loadCallback).toBe(true);
        });
    });

    it('Call load with one css resource argument (url, type, node) - check callback with wrong node', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "css", node: {id: 'test-node-style123'}}
            ], function () {
                loadCallback = true;
            });
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect(loadCallback).toBe(true);
        });
    });

    it('Call load with one css resource argument (url, type) - check callback with wrong type', function () {
    
        var instance,
            cache = new app.cache.controller(function (callbackObject) {
                instance = callbackObject;
            }),
            loadCallback;
    
        waitsFor(function () {
            return instance !== undefined;
        }, 'cache.storage initialized', 1000);
    
        runs(function () {
            cache.load([
                {url: "../src/css/app.css", type: "cs"}
            ], function () {
                loadCallback = true;
            });
        });
        
        waitsFor(function () {
            return loadCallback !== undefined;
        }, 'cache.storage initialized', 1000);
        
        runs(function () {
            expect(loadCallback).toBe(true);
        });
    });

});