# Client side caching via javaScript #


## Introduction ##

This javaScript functions are demonstrating the possibility of client side caching via javaScript and html5 storage apis. Page resources like **images, javaScript files, stylesheets and html content could be saved locally** in the users browser to reduce http requests. On subsequent page views these resources will be taken from cache and won't be loaded via network. This could reduce the number of http request used for page loading and therefore will improve the overall page loading times.

The given resources will be appended to dom automatically in case of javaScript and stylesheet files (if not otherwise specified). You are also able to append data to a specific element on the page, e.g. to load images from cache and display them without any http requests. The idea for this project is based on the beautiful [lawnchair](http://brian.io/lawnchair/ "lawnchair")  and [wink](http://www.winktoolkit.org/ "wink")  libraries, but more focussed on official html5 standards and reducing http request.

**Key features**

+ Cache resources (css, js, html, img) locally in the browser to avoid http requests
+ Get best available html5 client side storage api automatically, choosing between:
	+ file system
	+ indexed database
	+ web sql database
	+ web storage (local storage)
+ Control lifetime and state of your files
+ Append css and js data automatically to dom (if not specified otherwise)
+ Avoid blocking download of javaScript files
+ Store image files and append them to dom (via automatical base64 encoding)
+ Control the html5 application cache api state (offline cache)
+ Gracefully degrades when the browser doesn't support html5 storage (resources are then just loaded via xhr and won't be cached)
+ No external library is neccessary for the code to work

**JavaScript files**

You will find the latest javaScript caching functions in the **build/** folder:

+ **build/cache.js**: The complete and uncompressed source code for development
+ **build/cache.dev.js**: The minified source code, but with some javaScript console logging informations to keep track of the current cache states
+ **build/cache.min.js**: The minified and optimized javaScript caching functions for production


### Demo ####

If you just want to see a working demo, open the generated **/example/full-cache/index.html** file in your browser. You need to run this file in a webserver to make shure the ajax calls are working. The other examples are just there to facilitate comparisons between different caching methods against html5 client side caching.

If you are not in the mood to install this project on a webserver, you could also visit the following weblink to get some working demonstrations. Check your browser console (or network panel) or follow the printed stack trace to see the html5 caching in action:


[Full featured html5 cache ](http://test.ulrichmerkel.com/client-side-cache/full-cache/ "Ulrich Merkel")


## Usage ##

### Quick start ####

Just pick the minified javascript caching file (**build/cache.min.js**) and append it to your html markup. After that you can load the resources you like.


        <!doctype html>
		<html>
    	<head>
        	<!-- some meta tags ... -->
    	</head>
   	 	<body>
   
			<!-- some html content ... -->

			<script src="js/cache.min.js"></script>
			<script>
        		app.helpers.events.on(window, 'load', function () {
        		
        		    // start loading files from cache
            		app.cache.load([
            			{url: "css/main.css", type: "css"},
            			{url: "js/vendor.js", type: "js"}
        			]);
        			
        		});        		
			</script>
	
    	</body>
		</html>

On following page loads these resources will be loaded from client-side cache and won't be transferred via network to reduce http requests.

### General API ####

#### Cache interface:  ####
There are three basic interface methods available.

		// load resources
		app.cache.load(
			resourcesObject,
			callback,
			adapterOptions
		);
		
		// remove resources
		app.cache.remove(
			resourcesObject,
			callback
		);
		
		// set defaults
		app.cache.setup(
			adapterOptions
		);

#### Resource options:  ####
There are several options you can use to specify a resource. This can be useful to handle lifetimes, appending data to dom or control the loading order. You will find some examples of how to use this options in the "Examples" section.

        {
     
     		/**
        	 * @type {integer} The optional loading group
        	 *
        	 * group of the resource, this is used for handling dependencies,
        	 * a following group begins to start loading when the previous has finished,
        	 * default value is 0
        	 */
        	group: 0,
        	
        	/**
        	 * @type {timestamp} The optional lastmod timestamp
        	 *
        	 * timestamp of the resource, used to mark a resource to be updated       
        	 * if not given the current timestamp via new Date().getTime() is used
        	 * the first time a resource is created
        	 */
       		lastmod: new Date().getTime(),
        	
        	/**
        	 * @type {integer} The optional lifetime timestamp
        	 *
        	 * time in milliseconds used to mark a resource 
        	 * to be updated after a given period if time, for testing 
        	 * purposes this option is set by default to 20s
        	 *
        	 * if set to '-1' the resource will not expires via lastmod
        	 * if set to '0' the resource will not always expires
        	 * 
        	 */
        	lifetime: 10000,
       
       		/**
        	 * @type {function} The optional callback function when loaded 
        	 *
        	 * this is useful to check the loaded state of
        	 * a single resource, you will also have access
        	 * to the loaded data
        	 */
        	loaded: function (data) {
        	
        	},
        
       		/**
      		 * @type {object} Optional container for additional dom node information
      		 */
      		node: {
      		
      			/**
      			 * @type {string} The id from the dom element to append the data to
      			 */
      			id: '',
      			
      			/**
      			 * @type {object} The current dom element to append the the data to
      			 */
      			dom: null
      		}
      	
        	/**
        	 * @type {string} The required content type 
        	 
           	 * type of the resource could be 'css', 'js', 'img', 'html'
        	 */
        	type: 'css',
        	
        	/**
        	 * @type {string} The required url of the resource
        	 * 
        	 * will be used as the key for storing and retrieving data
        	 */
        	url: 'resource.css',
        
        	/**
        	 * @type {float} The optional version 
        	 *
        	 * number of the resource, used to mark a resource to be updated
        	 */
        	version: 1.0
 
        }
   
#### Adapter options:  ####
You are able to specify, which storage adapters you want to use, which one you prefer and which kind of resources you want to store:

        {
        	adapters: {
				types: [
					/**
					 * define which adapters will be checked and what kind of resource
					 * types will be cached there
					 */
					{type: 'fileSystem', css: true, js: true, html: true, img: true },
					{type: 'indexedDatabase', css: true, js: true, html: true, img: false },
					{type: 'webSqlDatabase', css: true, js: true, html: true, img: false }
                   	{type: 'webStorage', css: true, js: true, html: false, img: false }
				],
				// this adapter is the first one the check will start with
                preferredType: 'indexedDatabase'
           	}
     	}
           	
### Examples ####

#### Basic html example code with cache initializing: ####

An interface to load resources is given via the `window.app.cache.load(resourceArray, callbackFunction)` function. You don't really need the `window` prefix, this is just for the sake of completeness. This function expects as the first parameter the resources array and the second parameter is the optional callback function after all of them have been loaded.
There is a minified and combined version of the functions you will need included in the build directory (__build/cache.min.js__). Append the __cache.min.js__ file just before the closing body tag.

If you want to use html5 application cache, you need to ensure that some html markup is done. The usage of the application cache will need the manifest attribute placed into the current html element. This attribute expects a valid path to the manifest file. For a short manifest example, scroll down to the section "Offline application cache initializing".

Below you will find a short and combined example of how you can initialize html5 client side caching in your html file:

        <!doctype html>
		<html manifest="cache.manifest">
    	<head>
       		<meta charset="utf-8">
        	<title>Client side caching</title>
        	
        	<!-- some meta tags ... -->
        
    	</head>
   	 	<body>
   
			<!-- some html content ... -->

			<script src="js/cache.js" type="text/javaScript"></script>
			<script>
			
				/**
				 * load additional resources on window load,
				 * you are free to use your own event listenter, this
				 * event helper is just implemented for your convenience
				 */
        		app.helpers.events.on(window, 'load', function () {
        		
        		    // start loading files from cache
            		app.cache.load([
            			{url: "css/app.css", type: "css"},
            			{url: "js/lib.js", type: "js"}
        			]);
        			
        		});
        		
			</script>
	
    	</body>
		</html>

#### Load resources:  ####
Below you will find a simple example of loading (or storing) data from your local html5 cache. The second javaScript file (js/plugin.js) starts loading after the previous 2 files are loaded completly. This could be achieved with the group parameter (default is 0 and will be set automatically, if not present).

		// load some resources
        app.cache.load([
        	{url: "css/app.css", type: "css", loaded: function () {
        		// css file loaded
        	}},
       	    {url: "js/lib.js", type: "js", lifetime: 900000},
            {url: "js/plugin.js", type: "js", group: 1}
        ], function () {
        	// all resources loaded
        });

For a full list of available resource options, please take a look at the section "Resource options". It is advised that you specify the mime type of each resource - if you omit this value, the resource type will be guessed automatically but this will cost performance.


#### Append resource data to dom:  ####
You can append data to a given dom element on the page, if you specify a node parameter. This could be useful to load images and html files from cache and append the result to a some elements on the page.

		// load images
        app.cache.load([
        	{url: "img/410x144/test-1.jpg", type: "img", node: {id: "image-1"}},
       	    {url: "img/410x144/test-2.jpg", type: "img", node: {id: "image-2"}},
            {url: "img/410x144/test-3.jpg", type: "img", node: {id: "image-3"}}
        ]);

        // load html
        app.cache.load([
            {url: "ajax.html", type: "html", node: {id: "ajax"}}
        ]);

		// load css
        app.cache.load([
            {url: "css/app.css", type: "css", node: {id: "style-element"}}
        ]);
        
        // load js
        app.cache.load([
            {url: "js/lib.js", type: "js", node: {id: "script-element"}}
        ]);
        
		// append single data to multiple elements
        app.cache.load([
            {url: "ajax.html", type: "html", node: {id: "ajax-1"}},
            {url: "ajax.html", type: "html", node: {id: "ajax-2"}}
        ]);
        
        // use dom node attribute
        var elem = document.getElementById('ajax');
        app.cache.load([
            {url: "ajax.html", type: "html", node: {dom: elem}}
        ]);

#### Delete resource data:  ####
You can also remove resources from cache. The only available resource option for removing data is the url parameter.

		// remove resources from cache
        app.cache.remove([
        	{url: "img/410x144/test-1.jpg"},
       	    {url: "img/410x144/test-2.jpg"},
            {url: "img/410x144/test-3.jpg"}
        ], function () {
       		// all resources removed
       	});


#### Chaining:  ####
Due to the cache interface api you are allowed to call the app cache functions via chaining: 

		// load resources via chaining
   	    app.cache.load([
            {url: "img/410x144/test-1.jpg", type: "img", node: {id: "image-1"}}
        ]).load([
            {url: "img/954x600/test-2.jpg", type: "img", node: {id: "image-2"}},
            {url: "img/954x600/test-3.jpg", type: "img", node: {id: "image-3"}}
        ], function () {
        	// second block executed
        }).remove([
            {url: "img/1280x220/test-4.jpg"}
        ]);
            

#### Control lifetime:  ####
Below you will find some simple examples of controlling the resource lifetime. This could be useful to trigger updates and define the caching state of your resources.

		// trigger updates after 40s (lifetime value in milliseconds)
        app.cache.load([
        	{url: "css/app.css", type: "css", lifetime: 40000 }
        ]);
        
        // this file will never expire (except the version changed)
        app.cache.load([
        	{url: "css/app.css", type: "css", lifetime: -1 }
        ]);
        
		// this file will always expire, loaded via xhr
        app.cache.load([
        	{url: "css/app.css", type: "css", lifetime: 0 }
        ]);
        
        // trigger updates with version (assume previous version is 1.0, which is default)
        app.cache.load([
        	{url: "css/app.css", type: "css", version: 1.1 }
        ]);
        
        // set custom lastmod (lastmod value as timestamp)
        app.cache.load([
        	{url: "css/app.css", type: "css", lastmod: 1392676742621 }
        ]);
        
        // set custom lastmod, trigger updates after lastmod + 100s
        app.cache.load([
        	{url: "css/app.css", type: "css", lastmod: 1392676742621, lifetime: 100000 }
        ]);

#### Set cache options:  ####
You are able to set some options for handling local cache.

		// load some resources with cache options
        app.cache.load([
        	{url: "css/app.css", type: "css"}
        ], function () {
        	// all resources loaded
        }, {
        	adapters: {
				types: [
					// define which adapters will be checked and what kind of resource
					// types will be cached there
					{type: 'fileSystem', css: true, js: true, html: true, img: true },
					{type: 'indexedDatabase', css: true, js: true, html: true, img: false },
                   	{type: 'webStorage', css: true, js: true, html: false, img: false }
				],
				// this adapter is the first one the check will start with
                preferredType: 'indexedDatabase'
           	}
        
        });
     
     	// define some defaults for all app.cache.load function calls
        app.cache.setup({
        	adapters: {
				types: [
                   	{type: 'webStorage', css: true, js: true, html: true, img: false }
				]
           	}
    	});
        
#### Offline application cache initializing:  ####
The offline application cache differs from the usage of the other four html5 storage adapters. Due to it's different javaScript api and idea of how to store data locally, you are just able to listen to the events this kind of storage fires. You can use this adapter to control the current state of the application cache. This could be used to display a loading bar or listen for updates.


        app.cache.load('applicationCache', function () {
            // do something when application cache is loaded
        });
 
   
You will need to define the resources you want to be offline cached in a separate manifest file. Make sure you reference the manifest attribute on the html dom node to a valid __cache.manifest__ file. The callback function will be fired on `cached`, `updateready`, `obsolete` and `idle` events. So you know when the application cache is ready.

Below you will find a sample cache manifest file:


        CACHE MANIFEST

		# Our cached resources
		# version 1

		CACHE:

		# js files
		./js/cache.min.js

		# css files
		./css/base.css

		# images
		./img/test-1.jpg
		./img/test-2.jpg
		./img/test-3.jpg


		NETWORK:
		*

		FALLBACK:


***

## Basic idea ##

The logic will check your browser capabilities for storing data locally and look for an according storage type to use. If one of these html5 adapters is available in your browser, the given resources will be cached locally. On each revisite of the page, these resources will be loaded from cache to reduce the network bandwidth and http requests (if they are valid and not stale). If there is no support for storing the data locally in your browser, the logic gracefully degrades. Then all the resources will be loaded via xhr.

There are four storage adapters available, where you will have direct access to your cache resources. These are **File System**, **Indexed Database**, **WebSql Database** and **Web Storage** (or Local Storage). The check will start with File System (offering 50 MB space out of the box, but is only available in chrome at the time of this writing) and going further to Indexed Database (giving you 5 - 50 MB depending on the device and browser). If these tests failed, the javaScript logic will look for WebSql Database support and if this one is not available for Web Storage support. These both adapters gave you round about 5 MB of local disc space, but this can vary on the device and browser. Web Storage is widely supported, even internet explorer 8 supports this javaScript api.

The offline **Application Cache** differs from the usage of the other four. Due to it's different javaScript api and idea of how to store data, you are just able to listen to the events this kind of storage fires.

* * *


## Project Installation ##

This project is based on Grunt.js, a [node.js](http://nodejs.org/ "Node Js") build tool. For more and deeper information please visit the [ofifficial website](http://gruntjs.com/ "Grunt Js") or just do some [googling](http://google.com/?q=grunt "Google"). Some basic terminal commands are listed for your convenience below. Just navigate your command line to your correspondig project folder and paste the following commands.

### Grunt CLI installation ###

	npm install -g grunt-cli	// sudo npm ... could be useful

### Node package installation ###

	npm install					// sudo npm ... could be useful

### Example Usage ###
        
    grunt						// default watch task
    grunt build					// build project, generate files

* * *


## Project structure ##

### General ###




	build/
	examples/
	extras/
	Gruntfile.js
	LICENSE
	node_modules/	
	package.json
	README.md
	scripts/
	src/
	├── js/
	└── template/
	tests/



#### build/ ####
* Contains all generated files for production.    


#### examples/ ####
* Contains several generated html examples, mainly for comparison reason.

#### extras/ ####
* Contains all additional scripts (like java files) which are maybe useful during the build process.

#### src/ ####
* Contains all folders and files for development (less/sass files, parts of the javascript application, html source files, images, etc.).

#### src/js/ ####
* Folder for javaScript client side caching source files. Here you will find all logic for handling html5 client side caching.

#### src/template/ ####
* This is the source folder for all html examples. All static content is generated via [assemle](http://assemble.io/ "Assemble IO"), to automate this process as much as possible.

#### tests/ ####
* This folder contains some jasmine javacript tests to make sure the interface is working properly.
* An automatic [karma](http://karma-runner.github.io/ "Karma") test runner config is included for your convinience (extras/karma.conf.js), to run the test specs in multiple browsers at once. Just run `karma start extras/karma.conf.js` within your terminal.


### javaScript caching source files ####


There is no external library neccessary for the code to work. The logic is split into several functions and files under the global javaScript namespace `window.app`. If you want to modify the source code, the files you will need are listed in **src/js/_app/**. The underscore within the _app folder just indicates that this folder won't be generated during the build process. You are free to rename and reorganize the given folder structur, as long as you include the needed files in the correct order (make sure you **include the helpers first**). The correspondig javaScript namespace is handled by the namespace.js helper functions.

#### Helpers ####
- src/js/_app/helpers/namespace.js
- src/js/_app/helpers/utils.js
- src/js/_app/helpers/console.js
- src/js/_app/helpers/ajax.js
- src/js/_app/helpers/events.js
- src/js/_app/helpers/json.js
- src/js/_app/helpers/queue.js
- src/js/_app/helpers/client.js
- src/js/_app/helpers/dom.js

The helper files are used to get some utility functions. They provide some useful functions and information which will be needed to manage the caching mechanism and get some browser workarounds. The most important helper files are namespace.js and utils.js. The namespace.js file will take cake of the correct global javaScript namespacing whereas the utils.js is a kind if library for different browser functions and workarounds.

If you need to organize your code and the caching functions under if different global javaScript namespace rather than `window.app`, you are free to modify it. Just edit the corresponding variable (`namespaceName`) in **src/js/_app/helpers/namespace.js**, combine all necessary javaScript files and all the caching functions are available under your custom namespace.

#### Caching ####
- src/js/_app/cache/storage/controller.js
- src/js/_app/cache/storage/adapter/fileSystem.js
- src/js/_app/cache/storage/adapter/indexedDatabase.js
- src/js/_app/cache/storage/adapter/webSqlDatabase.js
- src/js/_app/cache/storage/adapter/webStorage.js
- src/js/_app/cache/storage/adapter/applicationCache.js
- src/js/_app/cache/controller.js
- src/js/_app/cache/interface.js

The cache storage controller (**src/js/\_app/cache/storage/controller.js**) is responsible for checking the different html5 storage adapters. He also provides an consistent interface to store and retrieve the data from cache. The main logic for handling the caching functions is listed in the cache controller (**src/js/\_app/cache/controller.js**). This file will take care of checking for outdated data and loading the data you are requesting.

#### Customizing ####
If you don't need one or some of the storage adapters (**src/js/\_app/cache/storage/adapter/...js**), you can just delete these files to reduce the overall file size. The easiest way is to modify the **src/js/cache.files** and start the `grunt build` process within your command line. If you just want to use for example the webStorage adapter to save data locally, the javaScript files you will need to include are:

- src/js/_app/helpers/namespace.js
- src/js/_app/helpers/utils.js
- src/js/_app/helpers/console.js
- src/js/_app/helpers/ajax.js
- src/js/_app/helpers/events.js
- src/js/_app/helpers/json.js
- src/js/_app/helpers/queue.js
- src/js/_app/helpers/client.js
- src/js/_app/helpers/dom.js

- src/js/_app/cache/storage/controller.js
- src/js/_app/cache/storage/adapter/webStorage.js
- src/js/_app/cache/controller.js
- src/js/_app/cache/interface.js

It is recommended that you combine all the single files into one and minimize the combined file. There are lot's of comments included in the source files to make the code better readable, which will be removed while minification during the grunt build process.
If you're using Grunt.js to build your customized version, you can edit the **src/js/cache.files** file and start the build process via `grunt build`. Your customized version will be saved in the build folder and is already minified and optimized.


***

## Tests ###

### Tested and supported browsers:  ###

An automatic [karma](http://karma-runner.github.io/ "Karma") test runner config is included for your convinience (extras/karma.conf.js), to run the test specs in multiple browsers at once. Just run `karma start extras/karma.conf.js` within your terminal.

#### Web Storage: ####
 - Internet Explorer 8.0 +
 - Firefox 3.5 +
 - Safari 4.0 +
 - Google Crome 4.0 +
 - Opera 10.5 +
 - Maxthon 4.0.5 +
 - iOs 2.0 +
 - Android 2.0 +
 - Camino 2.1.2 +
 - Fake 1.8 +
 - Omni Web 5.11 +
 - Stainless 0.8 +
 - Seamonkey 2.15 +
 - Sunrise 2.2 +
 - Sleipnir 4.4 +
 - iCab 5.1.1 +
 - Yandex 13.0 +
 - Torch 23.0 +
 
#### WebSql Database: ####
 - Safari 3.1 +
 - Google Crome 4.0 +
 - Opera 10.5 +
 - Maxthon 4.0.5 +
 - iOs 6.1 + (3.2)
 - Android 2.1 +
 - Stainless 0.8 +
 - iCab 5.1.1 +
 - Yandex 13.0 +
 - Torch 23.0 +
 
#### Indexed Database ####
 - Internet Explorer 10.0 +
 - Firefox 20.0 +
 - Google Crome 17.0 +
 - Opera 12.5 +
 - Maxthon 4.0.5 +
 - Seamonkey 2.15 +
 - Yandex 13.0 +
 
#### File System ####
 - Google Crome 26.0 +
 - Opera 19.0 +
 - Maxthon 4.0.5 +
 - Yandex 13.0 +
 - Torch 23.0 +
 
#### Application Cache ####
 - Internet Explorer 10.0 +
 - Firefox 20.0 +
 - Safari 5.1 +
 - Google Crome 17.0 +
 - Opera 12.5 +
 - Maxthon 4.0.5 +
 - iOs 3.2 +
 - Android 2.1 +
 - Yandex 13.0 +
 - Torch 23.0 +

#### Fallback (no caching, just dynamic loading via xhr): ####
- Internet Explorer 7.0
- Internet Explorer 6.0 (no dynamic html loading, just css/js/img)
- Flock 2.6


