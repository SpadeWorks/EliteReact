// import 'raf/polyfill';
import '../node_modules/es6-promise/dist/es6-promise.js';
import '../node_modules/whatwg-fetch/fetch.js';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
// import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';

require('es6-promise/auto');

declare var Array: any;
/* tslint:disable */
if (!Array.prototype.find) {
/* tslint:enable */ 

//* IE 11 does not support the Array.find method.
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate): void {
     'use strict';
     if (this == null) {
       throw new TypeError('Array.prototype.find called on null or undefined');
     }
     if (typeof predicate !== 'function') {
       throw new TypeError('predicate must be a function');
     }
     let list = Object(this);
     let length = list.length >>> 0;
     let thisArg = arguments[1];
     let value;

     for (let i = 0; i < length; i++) {
       value = list[i];
       if (predicate.call(thisArg, value, i, list)) {
         return value;
       }
     }
     return undefined;
    }
  });
}

