export default function install(alasql) {
	var utils = alasql.utils;
	/*
	Environment detection and the path of the library, split from src/15utility.js (docs/src-map.md). Same functions, same bodies.
*/

	/**
  Get the global scope
  Inspired by System.global
  @return {object} The global scope
  */
	utils.global = (function () {
		if (typeof self !== 'undefined') {
			return self;
		}
		if (typeof window !== 'undefined') {
			return window;
		}
		if (typeof global !== 'undefined') {
			return global;
		}
		return Function('return this')();
	})();

	/**
  Find out if a function is native to the enviroment
  @param {function} Function to check
  @return {boolean} True if function is native
  */
	var isNativeFunction = (utils.isNativeFunction = function (fn) {
		return typeof fn === 'function' && !!~fn.toString().indexOf('[native code]');
	});

	/**
  Find out if code is running in a web worker enviroment
  @return {boolean} True if code is running in a web worker enviroment
  */
	utils.isWebWorker = (function () {
		try {
			var importScripts = utils.global.importScripts;
			return utils.isNativeFunction(importScripts);
		} catch (e) {
			return false;
		}
	})();

	/**
  Find out if code is running in a node enviroment
  @return {boolean} True if code is running in a node enviroment
  */
	utils.isNode = (function () {
		try {
			if (typeof process === 'undefined' || !process.versions || !process.versions.node) {
				return false;
			}
			return true;
		} catch (e) {
			return false;
		}
	})();

	/**
  Find out if code is running in a browser enviroment
  @return {boolean} True if code is running in a browser enviroment
  */
	utils.isBrowser = (function () {
		try {
			return utils.isNativeFunction(utils.global.location.reload);
		} catch (e) {
			return false;
		}
	})();

	/**
  Find out if code is running in a browser with a browserify setup
  @return {boolean} True if code is running in a browser with a browserify setup
  */
	utils.isBrowserify = (function () {
		return utils.isBrowser && typeof process !== 'undefined' && process.browser;
	})();

	/**
  Find out if code is running in a browser with a requireJS setup
  @return {boolean} True if code is running in a browser with a requireJS setup
  */
	utils.isRequireJS = (function () {
		return (
			utils.isBrowser && typeof require === 'function' && typeof require.specified === 'function'
		);
	})();

	/**
  Find out if code is running with Meteor in the enviroment
  @return {boolean} True if code is running with Meteor in the enviroment

  @todo Find out if this is the best way to do this
  */
	utils.isMeteor = (function () {
		return typeof Meteor !== 'undefined' && Meteor.release;
	})();

	/**
  Find out if code is running on a Meteor client
  @return {boolean} True if code is running on a Meteor client
  */
	utils.isMeteorClient = utils.isMeteorClient = (function () {
		return utils.isMeteor && Meteor.isClient;
	})();

	/**
  Find out if code is running on a Meteor server
  @return {boolean} True if code is running on a Meteor server
  */
	utils.isMeteorServer = (function () {
		return utils.isMeteor && Meteor.isServer;
	})();

	/**
  Find out code is running in a cordovar enviroment
  @return {boolean} True if code is running in a web worker enviroment

  @todo Find out if this is the best way to do this
  */
	utils.isCordova = (function () {
		return typeof cordova === 'object';
	})();

	utils.isReactNative = (function () {
		var isReact = false;
		//*not-for-browser/*
		try {
			if (typeof require('react-native') === 'object') {
				isReact = true;
			}
		} catch (e) {
			void 0;
		}
		//*/
		return isReact;
	})();

	utils.hasIndexedDB = (function () {
		return !!utils.global.indexedDB;
	})();

	utils.isArray = function (obj) {
		return '[object Array]' === Object.prototype.toString.call(obj);
	};

	/**
  Get path of alasql.js
  @todo Rewrite and simplify the code. Review, is this function is required separately
  */
	utils.findAlaSQLPath = function () {
		/** type {string} Path to alasql library and plugins */

		if (utils.isWebWorker) {
			return '';
			/** @todo Check how to get path in worker */
		} else if (utils.isMeteorClient) {
			return '/packages/dist/';
		} else if (utils.isMeteorServer) {
			return 'assets/packages/dist/';
		} else if (utils.isNode) {
			return __dirname;
		} else if (utils.isBrowser) {
			var sc = document.getElementsByTagName('script');

			for (var i = 0; i < sc.length; i++) {
				if (sc[i].src.substr(-16).toLowerCase() === 'alasql-worker.js') {
					return sc[i].src.substr(0, sc[i].src.length - 16);
				} else if (sc[i].src.substr(-20).toLowerCase() === 'alasql-worker.min.js') {
					return sc[i].src.substr(0, sc[i].src.length - 20);
				} else if (sc[i].src.substr(-9).toLowerCase() === 'alasql.js') {
					return sc[i].src.substr(0, sc[i].src.length - 9);
				} else if (sc[i].src.substr(-13).toLowerCase() === 'alasql.min.js') {
					return sc[i].src.substr(0, sc[i].src.length - 13);
				}
			}
		}
		return '';
	};

	// set AlaSQl path
	alasql.path = alasql.utils.findAlaSQLPath();
}
