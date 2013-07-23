/*global window*/
/*global document*/
/*global confirm*/

/**
 * app.cache.storage.adapter.applicationCache
 * 
 * @description
 * - handle html5 offline application cache
 * - support:
 *      - Internet Explorer 10.0 +
 *      - Firefox 20.0 +
 *      - Safari 5.1 +
 *      - Google Crome 17.0 +
 *      - Opera 12.5 +
 *      - Maxthon 4.0.5 +
 *      - iOs 3.2 +
 * 
 * @version 0.1.3
 * @author Ulrich Merkel, 2013
 *
 * @namespace app
 *
 * @changelog
 * - 0.1.4 renamed addEventListener to adapterEvent, bug fixes progress event
 * - 0.1.3 improved module structur
 * - 0.1.2 initializing call via images loaded removed (seems to be buggy on edge connections), invoke main callback after 10 sec for slow connections
 * - 0.1.1 update ready event bug fixes
 * - 0.1 basic functions
 *
 * @see
 * - http://www.w3.org/TR/offline-webapps/
 * - http://www.html5rocks.com/de/tutorials/appcache/beginner/
 *
 * @bugs
 * -
 *
 */
(function (window, document, app, undefined) {
    'use strict';

    /**
     * undefined is used here as the undefined global
     * variable in ECMAScript 3 and is mutable (i.e. it can
     * be changed by someone else). undefined isn't really
     * being passed in so we can ensure that its value is
     * truly undefined. In ES5, undefined can no longer be
     * modified.
     *
     * window, document and app are passed through as local
     * variables rather than as globals, because this (slightly)
     * quickens the resolution process and can be more
     * efficiently minified (especially when both are
     * regularly referenced in this module).
     */

    /**
     * The overall limit for saving files is round abound 5 MB (depending on device).
     *  
     * the application cache can be checked/debugged in chrome with
     * chrome://appcache-internals/ to view and delete cached files or check the console
     * while the page is loading.
     *
     * firefox on desktop in general promts a popup
     * when trying to save data with application cache.
     */


    // create the global vars once
    var storageType = 'applicationCache',                       // @type {string} The storage type string
        helpers = app.helpers,                                  // @type {object} Shortcut for helper functions
        utils = helpers.utils,                                  // @type {object} Shortcut for utils functions
        on = utils.on,                                          // @type {object} Shortcut for on function
        log = utils.log,                                        // @type {function} Shortcut for utils.log function
        checkCallback = utils.callback,                         // @type {function} Shortcur for utils.callback function
        boolIsSupported = null,                                 // @type {boolean} Bool if this type of storage is supported or not
        htmlNode = document.getElementsByTagName('html')[0];    // @type {object} The dom html element


    /**
     * the actual instance constructor
     * directly called after new Adapter()
     *
     * @constructor
     */
    function Adapter() {

        // init local vars
        var self = this;

        // adapter vars
        self.adapter = null;
        self.type = storageType;
        self.isLoaded = false;
        self.delay = 25;

        // run init function
        self.init();

    }


    /**
     * instance methods
     *
     * Adapter.fn is just a shortcut for Adapter.prototype
     * 
     * @interface
     */
    Adapter.prototype = Adapter.fn = {

        /**
         * test if the browser supports this type of caching
         * 
         * @returns {boolean} Whether this type of storage is supported or not
         */
        isSupported: function () {

            // check for global var
            if (null === boolIsSupported) {
                boolIsSupported = !!window.applicationCache && !!utils.getAttribute(htmlNode, 'manifest');
                if (!boolIsSupported) {
                    log('[' + storageType + ' Adapter] ' + storageType + ' is not supported or there is no manifest html attribute');
                }
            }

            // return bool
            return boolIsSupported;

        },


        /**
         * adapter files loaded
         * 
         * invoke a callback function and make shure it's
         * only called once.
         *
         * @param {function} callback The function to be called on loaded
         */
        loaded: function (callback) {

            var self = this;

            if (!self.isLoaded) {
                self.isLoaded = true;
                window.setTimeout(function () {
                    callback();
                }, self.delay);
            }

        },


        /**
         * open adapter
         * 
         * open and initialize storage if not already done.
         * 
         * @param {function} callback The function called on success
         */
        open: function (callback) {

            // init local function vars
            var self = this,
                adapter = self.adapter,
                manifestProgressCount = 0,
                onUpdateReady;

            // check parameters
            callback = checkCallback(callback);

            // check for application cache support
            if (self.isSupported() && null !== adapter) {

                /**
                 * handle updates
                 */
                onUpdateReady = function () {
                    log('[' + storageType + ' Adapter] Event updateready');

                    // avoid errors in browsers that are not capable of swapCache
                    try {
                        adapter.swapCache();
                    } catch (e) {
                        log('[' + storageType + ' Adapter] Event updateready: swapcache is not available');
                    }

                    // ask user for refreshing the page
                    if (confirm("A new version of this website is available. Do you want to an update?")) {
                        window.location.reload(true);
                    } else {
                        self.loaded(callback);
                    }

                    return false;
                };


                /**
                 * checking event
                 *
                 * if the manifest file has not changed, and the app is already cached,
                 * the noupdate event is fired and the process ends.
                 */
                on(adapter, 'checking', function () {
                    log('[' + storageType + ' Adapter] Event checking');

                    return false;
                });


                /**
                 * no update event
                 * 
                 * if the manifest file has not changed, and the app is already cached,
                 * the noupdate event is fired and the process ends.
                 */
                on(adapter, 'noupdate', function () {
                    log('[' + storageType + ' Adapter] Event noupdate');
                    self.loaded(callback);

                    return false;
                });


                /**
                 * downloading cache files starts
                 * 
                 * if the application is not already cached, or if the manifest has changed,
                 * the browser downloads and caches everything listed in the manifest.
                 * the downloading event signals the start of this download process.
                 */
                on(adapter, 'downloading', function () {
                    log('[' + storageType + ' Adapter] Event downloading');
                    manifestProgressCount = 0;

                    return false;
                });


                /**
                 * download progress event
                 * 
                 * progress events are fired periodically during the downloading process,
                 * typically once for each file downloaded.
                 *
                 * @param {object} e The progress event object holding additionally information
                 */
                on(adapter, 'progress', function (e) {
                    log('[' + storageType + ' Adapter] Event progress');

                    var progress = "",
                        bar = document.getElementById('layer-loading-bar');

                    // to run the css animation smooth until end
                    self.delay = 500;

                    manifestProgressCount = manifestProgressCount + 1;

                    // Progress event: compute percentage
                    if (e && e.lengthComputable !== undefined) {
                        progress = " " + Math.round(100 * e.loaded / e.total) + "%";
                    } else {
                        progress = " " + Math.round(100 * manifestProgressCount / 20) + "%";
                    }

                    if (bar) {
                        bar.style.width = progress;
                    }

                    return false;
                });


                /**
                 * files are cached event
                 * 
                 * the first time an application is downloaded into the cache, the browser
                 * fires the cached event when the download is complete.
                 */
                on(adapter, 'cached', function () {
                    log('[' + storageType + ' Adapter] Event cached');
                    self.loaded(callback);

                    return false;
                });


                /**
                 * update is available event
                 *
                 * when an already-cached application is updated, and the download is complete
                 * the browser fires "updateready". Note that the user will still be seeing
                 * the old version of the application when this event arrives.
                 */
                on(adapter, 'updateready', function () {
                    onUpdateReady();
                });


                /**
                 * cache is obsolete event
                 *
                 * if a cached application references a manifest file that does not exist,
                 * an obsolete event is fired and the application is removed from the cache.
                 * subsequent loads are done from the network rather than from the cache.
                 */
                on(adapter, 'obsolete', function () {
                    log('[' + storageType + ' Adapter] Event obsolete');
                    window.location.reload(true);

                    return false;
                });


                /**
                 * cache error event
                 *
                 * if there is an error with the cache file or
                 * ressources can't be loaded.
                 */
                on(adapter, 'error', function () {
                    log('[' + storageType + ' Adapter] Event error');
                    self.loaded(callback);

                    return false;
                });


                /**
                 * additionally check for status constants
                 *
                 * since a cache manifest file may have been updated or loaded before a script attaches event
                 * listeners to test for the events, we check additionally for the current manifest status.
                 */
                switch (adapter.status) {
                case adapter.UNCACHED:
                    // UNCACHED == 0, occurs when there is a bug while downloading files
                    self.loaded(callback);
                    break;
                case adapter.IDLE:
                    // IDLE == 1, files are already loaded
                    self.loaded(callback);
                    break;
                case adapter.UPDATEREADY:
                    // UPDATEREADY == 4, update is available
                    onUpdateReady();
                    break;
                case adapter.OBSOLETE:
                    // OBSOLETE == 5, cache isn't valid anymore
                    self.loaded(callback);
                    break;
                default:
                    break;
                }


                /**
                 * check for manifest updates if a online network is available
                 *
                 */
                on(window, 'online', function () {
                    try {
                        adapter.update();
                    } catch (e) {
                        log('[' + storageType + ' Adapter] Window event online: update cache is not available');
                    }
                });


                /**
                 * call the main callback after certain time for slow
                 * internet connections or uncovered non-standard behaviours
                 * throwing errors.
                 *
                 * the page is already accessable because all application cache
                 * files will be loaded async in the background.
                 */
                window.setTimeout(function () {
                    if (!self.isLoaded) {
                        self.loaded(callback);
                    }
                }, 12000);


            } else {

                self.loaded(callback);

            }
        },


        /**
         * init storage
         *
         * @return {this} The instance if supported or false
         */
        init: function () {

            // init local vars
            var self = this,
                adapter = self.adapter;

            // check for support
            if (self.isSupported()) {

                if (null === adapter) {
                    adapter = self.adapter = window.applicationCache;
                }

            }

            // return false if there is no support
            return self;
        }

    };


    /**
     * make the storage adapter available under the
     * app.cache namespace
     *
     * @export
     */
    app.namespace('cache.storage.adapter.' + storageType, Adapter);


}(window, document, window.app || {}));