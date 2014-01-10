!function(a){"use strict";function b(){a[f]={}}function c(){return a[f]||b(),a[f]}function d(c,d){if(c){c=String(c);var e,g=c.split("."),h=g.length,i=a[f];if(i||b(),!g)return!1;for(e=0;h>e;e+=1)i[g[e]]||(i[g[e]]={},e===h-1&&d&&(i[g[e]]=d)),i=i[g[e]];return i}return!1}var e,f="app";e=c(),e.namespace=d,a[f]=e,a.getNamespace=a.getNs=c}(window),function(a){"use strict";a.onerror=function(){}}(window,window.getNamespace()),function(a){"use strict";function b(){var a=this;return a instanceof b?(a.methods=[],a.response=null,a.flushed=!1,void 0):new b}b.prototype=b.fn={add:function(a){var b=this;b.flushed?a(b.response):b.methods.push(a)},flush:function(a){var b=this;if(!b.flushed)for(b.response=a,b.flushed=!0;b.methods[0];)b.methods.shift()(a)}},a.namespace("helpers.queue",b)}(window.getNs()),function(a,b,c,d){"use strict";var e=function(){var c=null,f=a.console!==d,g=f?a.console:null,h=f&&g.log!==d,i=f&&g.warn!==d,j=f&&g.time!==d&&g.timeEnd!==d,k=[];return{isString:function(a){return"string"==typeof a||a instanceof String},isFunction:function(a){return"function"==typeof a||a instanceof Function},isArray:function(a){var b=Array.isArray,c=Object.prototype.toString;return e.isArray=b&&"function"==typeof b?function(a){return b(a)}:c&&"function"===c?function(a){return"[object Array]"===c.call(a)}:function(a){return!!a.sort&&"function"==typeof a.sort},e.isArray(a)},inArray:function(a,b,c){return e.inArray=Array.prototype.indexOf?function(a,b,c){return k.indexOf.call(b,a,c)}:function(a,b,c){var d=b.length,e=0;if(c)return b[c]&&b[c]===a?c:-1;for(e=0;d>e;e+=1)if(b[e]===a)return e;return-1},e.inArray(a,b,c)},callback:function(a){return e.isFunction(a)||(a=function(){}),a},on:function(c,d,f){e.on="function"==typeof a.addEventListener?function(a,b,c){a.addEventListener(b,c,!1)}:"function"==typeof b.attachEvent?function(a,b,c){a.attachEvent("on"+b,c)}:function(a,b,c){a["on"+b]=c},e.on(c,d,f)},off:function(c,d,f){e.off="function"==typeof a.removeEventListener?function(a,b,c){a.removeEventListener(b,c,!1)}:"function"==typeof b.detachEvent?function(a,b,c){a.detachEvent("on"+b,c)}:function(a,b){a["on"+b]=null},e.off(c,d,f)},getXhr:function(){var a=null,b=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],c=b.length,d=0;for(d=0;c>d;d+=1){try{a=b[d]()}catch(e){continue}break}return a},xhr:function(a,b,c,f){var g,h=e.getXhr(),i="GET";if(b=e.callback(b),h){if(!a)return b(!1),void 0;f!==d?i="POST":f=null,c===d&&(c=!0),g=function(){if(4===h.readyState&&(h.status>=200&&h.status<400||0===h.status))try{var a=h.responseText;a?b(a):b(!1)}catch(c){b(!1)}else 4===h.readyState&&b(!1)},h.open(i,a,c);try{h.onreadystatechange!==d?h.onreadystatechange=g:h.onload!==d&&(h.onload=g)}catch(j){h.onload=null,h.onload=g}h.send(f)}else b(!1)},getJson:function(){return null===c&&a.JSON&&a.JSON.stringify&&(c=a.JSON),c},jsonToString:function(a){var b=!1;return null===c&&(c=e.getJson()),c&&a&&(b=c.stringify(a)),b},jsonToObject:function(a){var b=!1;return null===c&&(c=e.getJson()),c&&a&&(b=c.parse(a)),b},logToScreen:function(a){var c=b.getElementById("log"),d=b.createElement("p"),e=b.createTextNode(a);c&&(d.appendChild(e),c.appendChild(d))},log:function(){var a,b=arguments,c=b.length;c&&(h&&g.log.apply(g,b),a=b[0],e.logToScreen(a))},warn:function(){var a,b=arguments,c=b.length;c&&(a=b[0],i?g.warn.apply(g,b):e.log(a),e.logToScreen(a))},logTimerStart:function(b){j&&a.console.time(b)},logTimerEnd:function(b){j&&a.console.timeEnd(b)},url:function(a){if(e.isString(a)){var c,d=b.createElement("a"),f=function(){var b=a.lastIndexOf("/"),c=a.substr(0,b+1);return c};return d.href=a,c=d.pathname.match(/\/([^\/?#]+)$/i),{source:a,protocol:d.protocol,host:d.hostname,port:d.port,query:d.search,file:c?c[1]:"/",hash:d.hash,path:d.pathname.replace(/^([^\/])/,"/$1"),folder:f()}}},queryString:function(){var b,c,e={},f=a.location.search.substring(1),g=f.split("&"),h=g.length,i=0;for(i=0;h>i;i+=1)b=g[i].split("="),e[b[0]]===d?e[b[0]]=b[1]:"string"==typeof e[b[0]]?(c=[e[b[0]],b[1]],e[b[0]]=c):e[b[0]].push(b[1]);return e}(),sprintf:function(a){var b=1,c=arguments;return a.replace(/%s/g,function(){return b<c.length?c[b++]:""})},trim:function(a){return e.isString(a)?(e.isFunction(String.prototype.trim)||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),a.trim()):a}}}();c.namespace("helpers.utils",e)}(window,document,window.getNs()),function(a,b,c,d){"use strict";var e=function(){function e(){var b=parseInt(a.orientation,10);switch(b){case 0:Q=V;break;case 180:Q=V;break;case 90:Q=U;break;case-90:Q=U}}function f(){T||(Y(a,"orientationchange",e),T=!0)}function g(){y=null!==X.match(/(iphone|ipod|ipad)/),y&&f()}function h(){z=null!==X.match(/(webkit)/)}function i(){A=null!==X.match(/(android)/),A&&f()}function j(){B=null!==X.match(/(blackberry)/),B&&f()}function k(){C=null!==X.match(/(opera)/)}function l(){D=null!==X.match(/(chrome)/)}function m(){E=null!==X.match(/(safari)/)}function n(){F=null!==X.match(/(firefox)/)}function o(){G=null!==X.match(/(seamonkey)/)}function p(){H=null!==X.match(/(camino)/)}function q(){I=null!==X.match(/(msie)/)}function r(){J=null!==X.match(/(ipad)/),J&&f()}function s(){K=null!==X.match(/(iphone)/),K&&f()}function t(){/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(X)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(X.substr(0,4))?(L=!0,f()):L=!1}function u(){var a,c;c=X.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),c&&null!==(a=W.match(/version\/([\.\d]+)/i))&&(c[2]=a[1]),M=c?c[2]:b.appVersion}function v(){if(y===d&&g(),y){var a=b.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);N=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3]||0,10)]}}function w(){O===d&&(Y(a,"online",w),Y(a,"offline",w)),O=b.onLine!==d?!!b.onLine:!0}function x(){var a=b.connection||b.mozConnection||b.webkitConnection||{type:0,UNKNOWN:0,ETHERNET:1,WIFI:2,CELL_2G:3,CELL_3G:4},c=function(){P=a};a.onchange=c,c()}var y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U="landscapeMode",V="portraitMode",W=b.userAgent||b.vendor||a.opera,X=W.toLowerCase(),Y=c.helpers.utils.on;return{isiOS:function(){return y===d&&g(),y},isWebkit:function(){return z===d&&h(),z},isAndroid:function(){return A===d&&i(),A},isBlackberry:function(){return B===d&&j(),B},isChrome:function(){return D===d&&l(),D},isOpera:function(){return C===d&&k(),C},isSafari:function(){return E===d&&m(),E},isFirefox:function(){return F===d&&n(),F},isSeamonkey:function(){return G===d&&o(),G},isCamino:function(){return H===d&&p(),H},isMsie:function(){return I===d&&q(),I},isiPad:function(){return J===d&&r(),J},isiPhone:function(){return K===d&&s(),K},isMobile:function(){return L===d&&t(),L},getBrowserVersion:function(){return M===d&&u(),M},getiOSVersion:function(){return N===d&&v(),N},isOnline:function(){return O===d&&w(),O},getNetworkConnection:function(){return P===d&&x(),P},isStandalone:function(){return b.standalone!==d&&b.standalone},isTouchDevice:function(){return!!("ontouchstart"in a)||a.navigator.msMaxTouchPoints},orientation:function(){return a.orientation?a.orientation:0},orientationMode:function(){return Q===d&&e(),Q},hasRetinaDisplay:function(){return a.devicePixelRatio>=2},hasCanvas:function(){if(R===d){var a=document.createElement("canvas");R=!(!a.getContext||!a.getContext("2d"))}return R},hideStatusbar:function(b){b||(b=0),a.clearTimeout(S),S=a.setTimeout(function(){0===parseInt(a.pageYOffset,10)&&a.scrollTo(0,1)},b)}}}();c.namespace("helpers.client",e)}(window,window.navigator,window.getNs()),function(a,b,c){"use strict";function d(b,c){return c&&(c.dom?b=c.dom:c.id&&(b=a.getElementById(c.id))),b}var e=function(){var f=b.helpers,g=f.utils,h=f.client,i=[],j=[],k=[],l=[],m=a.getElementsByTagName("head")[0],n="lazyloaded";return{_destroy:function(){i=[],j=[],k=[],l=[]},createDomNode:function(b,c){var d,e=a.createElement(b);if(c)for(d in c)c.hasOwnProperty(d)&&e.setAttribute(d,c[d]);return e},hasClass:function(a,b){return new RegExp(" "+b+" ").test(" "+a.className+" ")},getAttribute:function(a,b){return a.getAttribute(b)},setAttribute:function(a,b,c){a.setAttribute(b,c)},appendCss:function(b,c,f,j,k){if(-1===g.inArray(b,i)||k){var l,o=null;if(o=d(o,j),null!==c){o||(o=e.createDomNode("style",{type:"text/css"}),o.className=n),o.onerror=function(){f(!1)},j||m.appendChild(o);try{l=a.createTextNode(c),o.appendChild(l)}catch(p){o.styleSheet.cssText=c}finally{f()}}else null!==b&&(o||(o=e.createDomNode("link",{rel:"stylesheet",type:"text/css"}),o.className=n),o.onerror=function(){f(!1)},j||m.appendChild(o),h.isMsie()||h.isOpera()?o.onload=f:f(),o.href=b);i.push(b)}else f()},appendJs:function(b,c,f,h,i){if(-1===g.inArray(b,j)||i){var k=e.createDomNode("script"),l=a.getElementsByTagName("script")[0],o=!1;if(k=d(k,h),!k)return f(),void 0;k.type="text/javascript",k.className=n,k.async=!0,k.onreadystatechange=k.onload=function(){o||this.readyState&&"complete"!==this.readyState&&"loaded"!==this.readyState||(this.onreadystatechange=this.onload=null,o=!0,j.push(b),f())},k.onerror=function(){this.onload=this.onreadystatechange=this.onerror=null,f()},h||(l?l.parentNode.insertBefore(k,l):m.appendChild(k)),c&&!o?(k.textContent?k.textContent=c:k.nodeValue?k.nodeValue=c:k.text=c,o=!0):null!==b&&(k.src=b),o&&(j.push(b),f())}else f()},appendImg:function(a,b,e,f){var g=null;g=d(g,f),g||(g=new Image),g.onerror=function(){g.onload=g.onerror=null,e()},g.onload=function(){g.onload=g.onerror=null,e()},b?g.src=b:a&&(g.src=a),g.complete&&g.naturalWidth!==c&&g.onload(),k.push(a)},appendHtml:function(b,c,e,f){var g=d(null,f);if(!g)return e(),void 0;if(c)try{g.innerHTML=c,f.id&&h.isMsie()&&a.styleSheets[0].addRule("#"+f.id+":after","content: ' ';")}catch(i){g.innerText=c}e(),l.push(b)}}}();b.namespace("helpers.dom",e)}(document,window.getNs()),function(a){"use strict";function b(a){j("["+g+" Adapter] "+a)}function c(a){if(a){var c="",d=a.name||a.message||a.code;switch(d){case FileError.QUOTA_EXCEEDED_ERR:c="Event: QUOTA_EXCEEDED_ERR";break;case FileError.NOT_FOUND_ERR:c="Event: NOT_FOUND_ERR, file does not exist";break;case FileError.SECURITY_ERR:c="Event: SECURITY_ERR";break;case FileError.INVALID_MODIFICATION_ERR:c="Event: INVALID_MODIFICATION_ERR";break;case FileError.INVALID_STATE_ERR:c="Event: INVALID_STATE_ERR";break;default:c="Event: Unknown Error"}b(c,a)}}function d(a,b,e){("."===b[0]||""===b[0])&&(b=b.slice(1)),b[0]?a.getDirectory(b[0],{create:!0},function(a){b.length?d(a,b.slice(1),e):e()},c):e()}function e(a,b,c){var e=b.split("/"),f=e.length,g="",h=0;if(c=k(c),f){for(h=0;f-1>h;h+=1)g=g+e[h]+"/";d(a.root,g.split("/"),c)}else c()}function f(a){var b=this;return b instanceof f?(b.adapter=null,b.type=g,b.size=52428800,b.init(a),void 0):new f(a)}var g="fileSystem",h=a.getNs&&a.getNs()||a,i=h.helpers.utils,j=i.log,k=i.callback,l=null;f.prototype=f.fn={isSupported:function(){return null===l&&(l=!(!a.requestFileSystem&&!a.webkitRequestFileSystem&&!a.moz_requestFileSystem||!a.Blob&&!a.BlobBuilder),l||b(g+" is not supported")),l},open:function(d){var e=this,f=e.adapter;d=k(d),null===f?(a.requestFileSystem=a.requestFileSystem||a.webkitRequestFileSystem||a.moz_requestFileSystem,a.requestFileSystem(a.TEMPORARY,e.size,function(a){f=e.adapter=a,b("Try to create test resource");try{e.create("test-item",i.jsonToString({test:"test-content"}),function(a){a?e.remove("test-item",function(){b("Test resource created and successfully deleted"),d(f)}):d(!1)})}catch(g){c(g),d(!1)}},c)):d(f)},create:function(a,b,d){d=k(d);var f=this.adapter,g=function(a){c(a),d(!1,a)};e(f,a,function(){f.root.getFile(a,{create:!0},function(a){a.createWriter(function(a){var c;a.onwriteend=function(){d(!0)},a.onerror=g;try{Blob?(c=new Blob([b],{type:"text/plain"}),a.write(c)):BlobBuilder&&(c=new BlobBuilder,c.append(b),a.write(c.getBlob("application/json")))}catch(e){g(e)}},g)},g)})},read:function(a,b){var d=this.adapter,f=function(a){c(a),b(!1,a)};e(d,a,function(){d.root.getFile(a,{create:!1},function(a){a.file(function(a){var c=new FileReader;c.onloadend=function(){b(this.result)},c.readAsText(a)},f)},f)})},update:function(a,b,c){this.create(a,b,c)},remove:function(a,b){var d=this.adapter,f=function(a){c(a),b(!1,a)};b=k(b),e(d,a,function(){d.root.getFile(a,{create:!1},function(a){a.remove(function(){b(!0)},f)},f)})},init:function(a){var b=this;return b.isSupported()?(a&&a.size&&(b.size=a.size),b):!1}},i.isFunction(h.namespace)?h.namespace("cache.storage.adapter."+g,f):h[g]=f}(window),function(a,b){"use strict";function c(a){h("["+e+" Adapter] "+a)}function d(a){var b=this;return b instanceof d?(b.adapter=null,b.type=e,b.dbName="cache",b.dbVersion="1.0",b.dbTable="offline",b.dbDescription="Local offline cache",b.dbKey="key",b.init(a),void 0):new d(a)}var e="indexedDatabase",f=a.getNs&&a.getNs()||a,g=f.helpers.utils,h=g.log,i=g.callback,j=null;d.prototype=d.fn={isSupported:function(){return null===j&&(j=!!(a.indexedDB||a.webkitIndexedDB||a.mozIndexedDB||a.OIndexedDB||a.msIndexedDB),j||c(e+" is not supported")),j},create:function(a,b,d){var e=this,f=e.dbTable,g=e.dbName,h=e.adapter.transaction([f],"readwrite"),j=h.objectStore(f).put({key:a,content:b});d=i(d),h.onerror=function(a){c("Failed to init transaction while creating/updating database entry "+g+" "+a),d(!1,a)},j.onerror=function(a){c("Failed to create/update database entry "+g+" "+a),d(!1,a)},j.onsuccess=function(){d(!0)}},read:function(a,b){var d=this,e=d.dbTable,f=d.dbName,g=d.adapter.transaction([e],"readonly"),h=g.objectStore(e).get(a);return g&&h?(g.onerror=function(a){c("Failed to init transaction while reading database "+f+" "+a)},h.onerror=function(a){c("Failed to read database entry "+f+" "+a),b(!1,a)},h.onsuccess=function(a){a.target.result&&a.target.result.content?b(a.target.result.content):b(!1)},void 0):(b(!1),void 0)},update:function(a,b,c){this.create(a,b,c)},remove:function(a,b){b=i(b);var d=this,e=d.dbTable,f=d.dbName,g=d.adapter.transaction([e],"readwrite"),h=g.objectStore(e),j=h(e).put({key:a,content:""});g.onerror=function(a){c("Failed to init transaction while deleting database entry "+f+" "+a),b(!1,a)},j.onerror=function(a){c("Failed to delete database entry "+f+" "+a),b(!1,a)},j.onsuccess=function(){b(!0)}},open:function(d,e){var f,g,h,j,k=this,l=null,m=null,n=null,o=k.dbName,p=k.dbTable;if(e||(e=!1),d=i(d),null===k.adapter){if(l=a.indexedDB||a.webkitIndexedDB||a.mozIndexedDB||a.OIndexedDB||a.msIndexedDB,!l)return d(!1),void 0;if(a.webkitIndexedDB!==b&&(a.IDBTransaction=a.webkitIDBTransaction,a.IDBKeyRange=a.webkitIDBKeyRange),f=function(a){var b,e,f=m.result;k.adapter=f,k.dbVersion===f.version||!f.setVersion&&"function"!=typeof f.setVersion?d(f):(n=a.currentTarget.result.setVersion(k.dbVersion),n.onfailure=function(a){c("Failed to open database: "+o+" "+a),d(!1)},n.onsuccess=function(a){b=m.result,e=b.createObjectStore(p,{keyPath:k.dbKey}),c("Database needs upgrade: "+o+" "+a.oldVersion+" "+a.newVersion),e.createIndex("key","key",{unique:!0}),e.createIndex("content","content",{unique:!1})})},g=function(a){var b=m.result,d=b.createObjectStore(p,{keyPath:k.dbKey});c("Database needs upgrade: "+o+" "+a.oldVersion+" "+a.newVersion),d.createIndex("key","key",{unique:!0}),d.createIndex("content","content",{unique:!1})},h=function(a){c("Failed to open database: "+o+" "+a),e||k.open(d,!0),d(!1)},j=function(a){c("Opening database request is blocked! "+o+" "+a),d(!1)},e)try{m=l.open(o,k.dbVersion)}catch(q){c(q),m=l.open(o)}else m=l.open(o);m.onsuccess=f,m.onupgradeneeded=g,m.onerror=h,m.onblocked=j}else d(k.adapter)},init:function(a){var b=this;return b.isSupported()?(a&&(a.name&&(b.dbName=a.name),a.version&&(b.dbVersion=a.version),a.table&&(b.dbTable=a.table),a.description&&(b.dbDescription=a.description),a.key&&(b.dbKey=a.key)),b):!1}},g.isFunction(f.namespace)?f.namespace("cache.storage.adapter."+e,d):f[e]=d}(window),function(a){"use strict";function b(a){i("["+f+" Adapter] "+a)}function c(a,b,c,d,e,f){!f&&a?a.transaction(function(a){a.executeSql(b,c,d,e)}):f?f.executeSql(b,c,d,e):e(null,{code:0,message:"The storage adapter isn't available"})}function d(a){var c="Errorcode: "+(a.code||"Code not present")+", Message: "+(a.message||"Message not present");a.info&&(c=c+" - "+a.info),b(c)}function e(a){var b=this;return b instanceof e?(b.adapter=null,b.type=f,b.dbName="cache",b.dbVersion="1.0",b.dbDescription="resource cache",b.dbTable="websql",b.dbSize=4194304,b.init(a),void 0):new e(a)}var f="webSqlDatabase",g=a.getNs&&a.getNs()||a,h=g.helpers.utils,i=h.log,j=h.callback,k=null;e.prototype=e.fn={isSupported:function(){return null===k&&(k=!!a.openDatabase,k||b(f+" is not supported")),k},create:function(a,b,e){e=j(e);var f=this,g=function(){e(!0)},h=function(a,b){d(b),e(!1,b,{transaction:a})};c(f.adapter,"INSERT INTO "+f.dbTable+" (key, content) VALUES (?,?);",[a,b],g,h)},read:function(a,b){var e=this,f=function(a,c){var d=null;c&&c.rows&&1===c.rows.length&&(d=c.rows.item(0).content),b(d,null,{transaction:a})},g=function(a,c){d(c),b(!1,c,{transaction:a})};c(e.adapter,"SELECT content FROM "+e.dbTable+" WHERE key=?;",[a],f,g)},update:function(a,b,e){e=j(e);var f=this,g=function(){e(!0)},h=function(a,b){d(b),e(!1,b,{transaction:a})};c(f.adapter,"UPDATE "+f.dbTable+" SET content = ?  WHERE key=?;",[b,a],g,h)},remove:function(a,b){b=j(b);var e=this,f=function(){b(!0)},g=function(a,c){d(c),b(!1,c,{transaction:a})};c(e.adapter,"DELETE FROM "+e.dbTable+" WHERE key = ?;",[a],f,g)},open:function(b){b=j(b);var e=this,f=e.adapter,g=function(a,f){c(a,"CREATE TABLE IF NOT EXISTS "+e.dbTable+"(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL UNIQUE, content TEXT NOT NULL);",[],function(){b(a)},function(a){d(a),b(!1)},f)},h=function(a){g(null,a)},i=function(a){a.info="Can't migrate to new database version and using localStorage instead. This may be caused by non-standard implementation of the changeVersion method. Please switch back your database version to use webSql on this device.",d(a),b(!1)};try{if(null===f&&e.isSupported())if(e.adapter=f=a.openDatabase(e.dbName,"",e.dbDescription,e.dbSize),String(f.version)!==String(e.dbVersion)&&f.changeVersion&&"function"==typeof f.changeVersion)try{f.changeVersion(f.version,e.dbVersion,h,i)}catch(k){d(k),b(!1)}else f=a.openDatabase(e.dbName,e.dbVersion,e.dbDescription,e.dbSize),g(f);else e.isSupported()&&b(f)}catch(k){d(k),b(!1)}},init:function(a){var b=this;return b.isSupported()?(a&&(a.description&&(b.dbDescription=a.description),a.name&&(b.dbName=a.name),a.size&&(b.dbSize=a.size),a.table&&(b.dbTable=a.table),a.version&&(b.dbVersion=String(a.version))),b):!1}},h.isFunction(g.namespace)?g.namespace("cache.storage.adapter."+f,e):g[f]=e}(window),function(a){"use strict";function b(a){j("["+f+" Adapter] "+a)}function c(c){!c&&a.event&&(c=a.event),b("Event - key: "+(c.key||"no e.key event")+", url: "+(c.url||"no e.url event"))}function d(a){var b;switch(a){case"local":b="localStorage";break;case"session":b="sessionStorage";break;default:b="localStorage"}return b}function e(a){var b=this;return b instanceof e?(b.adapter=null,b.type=f,b.lifetime="local",b.init(a),void 0):new e(a)}var f="webStorage",g=a.getNs&&a.getNs()||a,h=g.helpers.utils,i=h.on,j=h.log,k=h.callback,l=null;e.prototype=e.fn={isSupported:function(){var c=this,e=d(c.lifetime);if(null===l)try{l=!!a[e]&&!!a[e].getItem}catch(g){b(f+" is not supported"),l=!1}return l},create:function(a,b,d){var e=this,f=!0;d=k(d);try{e.adapter.setItem(a,b),d(f)}catch(g){c(g),f=!f,d(f,g)}return f},read:function(a,b){var d,e=this;b=k(b);try{d=e.adapter.getItem(a),d?b(d):b(!1)}catch(f){c(f),b(!1,f)}return d},update:function(a,b,c){return this.create(a,b,c)},remove:function(a,b){var d=this,e=!0;b=k(b);try{d.adapter.removeItem(a),b(e)}catch(f){c(f),e=!e,b(e,f)}return e},open:function(e){var f=this,g=f.adapter,h=d(f.lifetime);if(e=k(e),null===g)try{g=f.adapter=a[h],i(a,"storage",c),b("Try to create test resource"),f.create("test-item",'{test: "test-content"}',function(a){a?f.remove("test-item",function(){b("Test resource created and successfully deleted"),e(g)}):e(!1)})}catch(j){return e(!1),void 0}else f.isSupported()&&e(g)},init:function(a){var b=this;return b.isSupported()?(a&&a.lifetime&&(b.lifetime=a.lifetime),b):!1}},h.isFunction(g.namespace)?g.namespace("cache.storage.adapter."+f,e):g[f]=e}(window),function(a,b,c){"use strict";function d(a){m("["+g+" Adapter] "+a)}function e(b,c){c.isLoaded||(c.isLoaded=!0,c.progressCallback(100),a.setTimeout(function(){b(),d("Event loaded")},c.delay))}function f(a){var b=this;return b instanceof f?(b.adapter=null,b.type=g,b.isLoaded=!1,b.delay=25,b.init(a),void 0):new f(a)}var g="applicationCache",h=a.getNs&&a.getNs()||a,i=h.helpers,j=i.utils,k=i.dom,l=j.on,m=j.log,n=j.callback,o=null,p=b.getElementsByTagName("html")[0];f.prototype=f.fn={isSupported:function(){return null===o&&(o=!!a.applicationCache&&!!k.getAttribute(p,"manifest"),o||d(g+" is not supported or there is no manifest html attribute")),o},open:function(b,f){var g,h,i=this,j=i.adapter,k=0;if(b=n(b),f&&f.progress&&(g=f.progress),g=i.progressCallback=n(g),i.isSupported()&&null!==j){switch(h=function(){d("Event updateready");try{j.swapCache()}catch(c){d("Event updateready: swapcache is not available",c)}return confirm("A new version of this website is available. Do you want to an update?")?a.location.reload(!0):e(b,i),!1},l(j,"checking",function(){return d("Event checking"),!1}),l(j,"noupdate",function(){return d("Event noupdate"),e(b,i),!1}),l(j,"downloading",function(){return d("Event downloading"),k=0,!1}),l(j,"progress",function(a){d("Event progress");var b="";return i.delay=500,k+=1,b=a&&a.lengthComputable!==c?Math.round(100*a.loaded/a.total):Math.round(100*k/20),g(b),!1}),l(j,"cached",function(){return d("Event cached"),e(b,i),!1}),l(j,"updateready",function(){h()}),l(j,"obsolete",function(){return d("Event obsolete"),a.location.reload(!0),!1}),l(j,"error",function(){return d("Event error"),e(b,i),!1}),j.status){case j.UNCACHED:e(b,i);break;case j.IDLE:e(b,i);break;case j.UPDATEREADY:h();break;case j.OBSOLETE:e(b,i)}l(a,"online",function(){try{j.update()}catch(a){d("Window event online: update cache is not available",a)}}),a.setTimeout(function(){i.isLoaded||e(b,i)},12e3)}else e(b,i)},init:function(){var b=this,c=b.adapter;return b.isSupported()&&null===c&&(c=b.adapter=a.applicationCache),b}},h.namespace("cache.storage.adapter."+g,f)}(window,document),function(a,b,c){"use strict";function d(a){t("["+o+" controller] "+a)}function e(b,c,d){d.timeout=a.setTimeout(function(){c(!1)},5e3),w(b,function(b){a.clearTimeout(d.timeout),delete d.timeout,b?c(b):c(!1)})}function f(a){return s.jsonToString(a)}function g(a){var b=null;try{b=s.jsonToObject(a)}catch(c){d("Couldn't convert json string to object."+c)}return b}function h(a,d,e){if(y){var f,g=b.createElement("canvas"),h=new Image,i=null,j=0,k=0;e||(e="jpeg"),h.onerror=function(){h.onload=h.onerror=null,d()},h.onload=function(){h.onload=h.onerror=null,j=g.height=h.height,k=g.width=h.width,f=g.getContext("2d"),f.fillStyle="rgba(50, 50, 50, 0)",f.fillRect(0,0,k,j),f.drawImage(h,0,0),i=g.toDataURL("image/"+e),d(i)},h.src=a,h.complete&&h.naturalWidth!==c&&h.onload()}else d(!1)}function i(a){var b,c,d,e=a.data,f=a.url,g=a.type;return"css"===g?(b=s.url(f),d=b.folder,c=e.replace(/url\(\../g,"url("+d+".."),c=c.replace(/url\(\'../g,"url('"+d+".."),c=c.replace(/url\(\"../g,'url("'+d+".."),a.data=c,a):a}function j(a){return{ajax:a.ajax,data:a.data,expires:(new Date).getTime()+(a.lifetime||D.lifetime),group:a.group!==c?a.group:D.group,lastmod:a.lastmod||D.lastmod,lifetime:a.lifetime!==c?a.lifetime:D.lifetime,type:a.type||D.type,version:a.version||D.version}}function k(a){return C&&C[a]?!!C[a]:!1}function l(a,b){var c,e=null;return a&&a.length?(c=a[0].type,d("Testing for storage adapter type: "+c),x[c]?e=new x[c](A):l(a.slice(1),b),e&&e.isSupported()?e.open(function(f){f?(B=c,C=a[0],d("Used storage adapter type: "+B),b(e)):l(a.slice(1),b)}):l(a.slice(1),b),void 0):(B||b(!1),void 0)}function m(a,b){var c,e=null,f=0;if(b)try{d("Testing for storage adapter type: "+b),x[b]?e=new x[b](A):m(a),e&&e.isSupported()?e.open(function(g){if(g){for(B=b,c=z.length,f=0;c>f;f+=1)z[f].type===b&&(C=z[f]);if(C)return d("Used storage type: "+B),a(e),void 0;d("Storage config not found: "+B),m(a)}else m(a)}):m(a)}catch(g){d("Storage adapter could not be initialized: type "+b,g),m(a)}else l(z,a)}function n(a,b){var c=this;return c instanceof n?(c.isEnabled=!0,c.adapter=null,c.adapters={types:z,defaults:A},c.appCacheAdapter=null,c.resourceDefaults=D,c.init(a,b),void 0):new n(a,b)}var o="storage",p=a.getNs&&a.getNs()||a,q=p.helpers,r=q.client,s=q.utils,t=s.log,u=s.callback,v=s.getJson(),w=s.xhr,x=p.cache.storage.adapter,y=r.hasCanvas(),z=[{type:"fileSystem",css:!0,js:!0,html:!0,img:!0},{type:"indexedDatabase",css:!0,js:!0,html:!0,img:!0},{type:"webSqlDatabase",css:!0,js:!0,html:!0,img:!0},{type:"webStorage",css:!0,js:!0,html:!0,img:!0}],A={name:"localcache",table:"cache",description:"local resource cache",size:4194304,version:"1.0",key:"key",lifetime:"local",offline:!0},B=null,C=null,D={ajax:!0,lifetime:2e4,group:0,lastmod:(new Date).getTime(),type:"css",version:1};n.prototype=n.fn={create:function(a,b){var c=this,g=a.url,l=a.type,m=function(e){if(!e)return d("Couldn't get data via network"),b(a),void 0;if(a.data=e,a=i(a),null!==c.adapter&&k(l)){var h=f(g),m=j(a),n=f(m);a.expires=m.expires,a.version=m.version;try{c.adapter.create(h,n,function(c){c?(d("Create new resource in storage adapter: type "+l+", url "+g),b(a)):(d("Create new resource in storage adapter failed"),b(!1))})}catch(o){b(a)}}else d("Trying to create new resource, but resource type is not cachable or storage adapter is not available: type "+l+", url "+g),b(a)};b=u(b),a.ajax?"img"===l?h(g,m):e(g,m,a):a.data?m(a.data):b(!1)},read:function(a,b){var c=this,h=a.url,i=a.type;if(b=u(b),null!==this.adapter&&k(i)){d("Trying to read resource from storage: type "+i+", url "+h);try{c.adapter.read(f(h),function(e){if(e){if(a=g(e),!a)return c.remove({url:h,type:i},function(){b(!1)}),void 0;a.url=h,d("Successfully read resource from storage: type "+i+", url "+h),b(a,!0)}else d("There is no data coming back from storage while reading: type "+i+", url "+h),b(!1)})}catch(j){e(h,function(c){a.data=c,d("Try to read resource from storage, but storage adapter is not available: type "+i+", url "+h),b(a,!0)},a)}}else b(a)},update:function(a,b){var c=this,g=a.url,l=a.type,m=function(e){if(!e)return d("Couldn't get data via network, trying to used stored version"),c.read(a,function(c){c&&c.data?(a.data=c.data,b(a)):b(!1)}),void 0;if(a.data=e,a=i(a),null!==c.adapter&&k(l)){var h=f(g),m=j(a),n=f(m);a.expires=m.expires,a.version=m.version;try{c.adapter.update(h,n,function(c){c?(d("Update existing resource in storage adapter: type "+l+", url "+g),b(a)):(d("Updating resource in storage failed."),b(!1))})}catch(o){b(a)}}else d("Resource type is not cachable or storage adapter is not available: type "+l+", url "+g),b(a)};b=u(b),a.ajax?"img"===l?h(g,m):e(g,m,a):a.data?m(a.data):b(!1)},remove:function(a,b){var c=this,e=a.url,g=a.type;b=u(b),null!==c.adapter&&k(g)?c.adapter.remove(f(e),function(c){return c?(d("Delete resource form storage: type "+g+", url "+e),b(a),void 0):(d("Deleting resource form storage failed: type "+g+", url "+e),b(!1),void 0)}):(d("Delete resource from storage failed, resource type is not cachable or there is no storage adapter: type "+g+", url "+e),b(a))},init:function(a,b){var e=this,f=!1;a=u(a),b&&b.isEnabled!==c&&(e.isEnabled=!!b.isEnabled),e.isEnabled&&v?(b&&(b.description&&(A.description=String(b.description)),b.key&&(A.key=String(b.key)),b.lifetime&&(A.lifetime=String(b.lifetime)),b.name&&(A.name=String(b.name)),b.size&&(A.size=parseInt(b.size,10)),b.table&&(A.table=String(b.table)),b.type&&(A.type=f=String(b.type)),b.offline&&(A.offline=Boolean(b.offline)),b.version&&(A.version=String(b.version))),A.offline&&x.applicationCache&&(e.appCacheAdapter=new x.applicationCache(A)),m(function(b){e.adapter=b,a(e)},f)):(v||d("There is no json support"),e.isEnabled||d("Caching data is disabled"),a(e))}},s.isFunction(p.namespace)?p.namespace("cache."+o+".controller",n):p[o]=n}(window,document),function(a,b,c){"use strict";function d(a){l("["+f+" controller] "+a)}function e(a,b){var c=this;c.storage=null,c.init(a,b)}var f="cache",g=a.getNs&&a.getNs()||a,h=g.helpers,i=h.dom,j=h.utils,k=h.client,l=j.log,m=j.isArray,n=j.callback;e.prototype=e.fn={load:function(a,b){var e=this,f=(new Date).getTime(),g=function(){var a=0,b=0,c=null;return{init:function(d,e){c=e,a=d,b=0},loaded:function(){b+=1,b===a&&c()}}}(),h=function(a,b,c){var d=a.url,e=n(a.loaded),f=function(){g.loaded(),e(a)},h=a.node||null;switch(c=!!c,a.type){case"js":i.appendJs(d,b,f,h,c);break;case"css":i.appendCss(d,b,f,h,c);break;case"img":i.appendImg(d,b,f,h,c);break;case"html":i.appendHtml(d,b,f,h,c);break;default:f()}},j=function(a,b){var d,g=e.storage.resourceDefaults,h=parseInt(b.lifetime,10),i=b.version,j=b.lastmod?b.lastmod:0,k=!1,l=a.lastmod?a.lastmod:0,m=!0,n=!1;return a.version=d=a.version!==c?parseFloat(a.version):g.version,a.group=a.group!==c?parseFloat(a.group):g.group,l&&j?(a.lastmod=parseInt(l,10),m=j===a.lastmod):!l&&j?l=j:l||(l=g.lastmod),k=m&&d===i,n=0!==h&&(-1!==h&&k&&b.expires>f||-1===h&&k),a.lastmod=l,a.isValid=n,a},l=function(a){var b=a.data||null,f=function(a,b){a&&a.data?h(a,a.data,b):h(a,null,b)},g=e.storage,i=g.resourceDefaults;a.ajax=a.ajax!==c?!!a.ajax:i.ajax,g.read(a,function(c){return c&&c.data?(a=j(a,c),!a.isValid&&k.isOnline()?(d("Resource is outdated and needs update: type "+a.type+", url "+a.url),g.update(a,f),void 0):(d("Resource is up to date: type "+a.type+", url "+a.url),b=c.data,b&&h(a,b),void 0)):(d("Resource or resource data is not available in storage adapter: type "+a.type+", url "+a.url),g.create(a,f),void 0)})},o=function(a,b){var c=0,d=a.length,e=null;for(g.init(d,b),c=0;d>c;c+=1)e=a[c],e&&e.url&&l(e)},p=function(a){var b,c,d,e=[],f=0,g=a.length;for(f=0;g>f;f+=1)c=a[f],d=c.group,d||(d=0),b=e[d]?e[d]:e[d]=[],b.push(c);return e},q=function(a,b,c){var d,e=a.length;for(c||(c=0);!a[c]&&e>c;)c+=1;
return c>=e?(b(),void 0):(d=a[c],o(d,function(){q(a,b,c+1)}),void 0)},r=function(a,c){a&&m(a)||(a=[]),a=p(a),c=n(b),d("Load resource function called: resources count "+a.length),q(a,c)};r(a,b)},remove:function(a,b){var c=this,e=c.storage,f=function(a,b){var c,f,g=a.length,h=function(a,c){d("Successfully removed resource: url "+c),a===g-1&&b()};if(!g)return b(),void 0;for(c=0;g>c;c+=1)f=a[c],f&&e.remove(f,h(c,f.url))},g=function(a,c){a&&m(a)||(a=[]),c=n(b),d("Remove resource function called: resources count "+a.length),f(a,c)};g(a,b)},init:function(a,b){var c=this;a=n(a),d("Cache initializing and checking for storage adapters"),g.cache.storage.controller(function(b){c.storage=b,a(b)},b)}},j.isFunction(g.namespace)?g.namespace(f+".controller",e):g[f]=e}(window,document),function(a,b){"use strict";function c(a){var b=this;b.controller=null,b.storage=null,b.params=a,b.queue=new k,b.calls=0}function d(a){var b,d=null,e=l.length;for(a||(a={}),b=0;e>b;b+=1)j(l[b].params)===j(a)&&(d=l[b]);return d||(d=new c(a),l.push(d)),d}var e,f=b.cache.controller,g=b.helpers,h=g.utils,i=h.isArray,j=h.jsonToString,k=g.queue,l=[];e=function(b,c,e){var g=d(e),h=function(a,b){var c;i(a)?g.controller.load(a,b):"applicationCache"===a&&(c=g.storage,c&&c.appCacheAdapter?c.appCacheAdapter.open(b,e):b())};return g.storage?h(b,c,e):(g.queue.add(function(){h(b,c,e)}),g.calls=g.calls+1,1===g.calls&&(g.controller=new f(function(b){g.storage=b,g.controller?g.queue.flush(this):g.interval=a.setInterval(function(){g.controller&&(a.clearInterval(g.interval),g.queue.flush(this))},25)},e))),this},b.namespace("cache.load",e)}(window,window.getNs());