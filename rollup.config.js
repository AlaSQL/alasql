/*
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import progress from 'rollup-plugin-progress';
import closure from 'rollup-plugin-closure-compiler-js';
import hashbang from 'rollup-plugin-hashbang'

*/
import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
//import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';
import cleanup from 'rollup-plugin-cleanup';


// https://github.com/ritz078/rollup-plugin-filesize
// https://github.com/jkuri/rollup-plugin-progress
// https://github.com/TrySound/rollup-plugin-uglify
// https://github.com/camelaissani/rollup-plugin-closure-compiler-js
// https://github.com/rollup/rollup-plugin-buble (for browser)
// https://github.com/jetiny/rollup-plugin-re
// https://github.com/ezolenko/rollup-plugin-typescript2
// https://www.npmjs.com/package/rollup-plugin-cleanup


const patterns = {'PACKAGE_VERSION_NUMBER': require('./package.json').version}

const patternsBrowser = {
	"//*not-for-browser/*": '/*not-for-browser/*',
	"/*only-for-browser/*": '//*only-for-browser/*',	
	...patterns
}

export default [
	/*{
		input: 'build/ES6/main',
		output: {
			name: 'alasql',
			file: 'build/alasql.es6.js',
			format: 'umd'
		},
		plugins: [
			//hashbang(),
			replace({patterns}),
			//progress(),
			resolve(), 
    		//buble(),
			filesize(),
		]
	},//*/
	{
		input: 'build/ES6/main',
		output: {
			name: 'alasql',
			file: 'dist/alasql.fs.js',
			format: 'umd'
		},
		plugins: [
			replace(patterns),
			resolve(), 
    		buble(),
			cleanup(),
			filesize(),
		]
	},{
		input: 'build/ES6/main',
		output: {
			name: 'alasql',
			file: 'dist/alasql.js',
			format: 'umd'
		},
		plugins: [
			replace(patternsBrowser),
			resolve(), 
    		buble(),
		//	cleanup(),
			filesize(),
		]
	},{
		input: 'build/ES6/main',
		output: {
			name: 'alasql',
			file: 'dist/alasql.min.js',
			format: 'umd'
		},
		plugins: [
			replace(patternsBrowser),
			resolve(), 
    		buble(),
    		uglify({compress:true}),
			filesize(),
		]
	},

];
