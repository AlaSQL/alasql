export default mem => {
	const utils = mem.alasql.utils;
	/**
    Find out if code is running in a web worker enviroment
    @return {boolean} True if code is running in a web worker enviroment
*/
	utils.isWebWorker = (() => {
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
	utils.isNode = (() => {
		try {
			return utils.isNativeFunction(utils.global.process.reallyExit);
		} catch (e) {
			return false;
		}
	})();

	/**
    Find out if code is running in a browser enviroment
    @return {boolean} True if code is running in a browser enviroment
*/
	utils.isBrowser = (() => {
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
	utils.isBrowserify = (() => {
		return utils.isBrowser && typeof process !== 'undefined' && process.browser;
	})();

	/**
    Find out if code is running in a browser with a requireJS setup
    @return {boolean} True if code is running in a browser with a requireJS setup
*/
	utils.isRequireJS = (() => {
		return (
			utils.isBrowser &&
			typeof require === 'function' &&
			typeof require.specified === 'function'
		);
	})();

	/**
    Find out if code is running with Meteor in the enviroment
    @return {boolean} True if code is running with Meteor in the enviroment

    @todo Find out if this is the best way to do this
*/
	utils.isMeteor = (() => {
		return typeof Meteor !== 'undefined' && Meteor.release;
	})();

	/**
    Find out if code is running on a Meteor client
    @return {boolean} True if code is running on a Meteor client
*/
	utils.isMeteorClient = utils.isMeteor && Meteor.isClient;

	/**
    Find out if code is running on a Meteor server
    @return {boolean} True if code is running on a Meteor server
*/
	utils.isMeteorServer = utils.isMeteor && Meteor.isServer;

	/**
    Find out code is running in a cordovar enviroment
    @return {boolean} True if code is running in a web worker enviroment

    @todo Find out if this is the best way to do this
*/
	utils.isCordova = typeof cordova === 'object';

	utils.isReactNative = (() => {
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

	utils.hasIndexedDB = !!utils.global.indexedDB;

	/**
    @function Is this IE9
    @return {boolean} True for IE9 and false for other browsers

    For IE9 compatibility issues
*/
	utils.isIE = () => {
		var myNav = navigator.userAgent.toLowerCase();
		return myNav.indexOf('msie') !== -1 ? parseInt(myNav.split('msie')[1]) : false;
	};

	/**
	Get path of alasql.js
	@todo Rewrite and simplify the code. Review, is this function is required separately
*/
	utils.findAlaSQLPath = function() {
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
};
