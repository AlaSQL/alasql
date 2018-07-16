/*
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import progress from 'rollup-plugin-progress';
import closure from 'rollup-plugin-closure-compiler-js';
import replace from 'rollup-plugin-replace';
import hashbang from 'rollup-plugin-hashbang'

*/
//import buble from 'rollup-plugin-buble';
//import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
//import typescript from 'rollup-plugin-typescript2';
//import filesize from 'rollup-plugin-filesize';


// https://github.com/ritz078/rollup-plugin-filesize
// https://github.com/jkuri/rollup-plugin-progress
// https://github.com/TrySound/rollup-plugin-uglify
// https://github.com/camelaissani/rollup-plugin-closure-compiler-js
// https://github.com/rollup/rollup-plugin-buble (for browser)
// https://github.com/jetiny/rollup-plugin-re
// https://github.com/ezolenko/rollup-plugin-typescript2

export default [
	{
		input: 'build/ES6/main',
		output: {
			name: 'alasql',
			//file: 'build/ES5/rexreplace.bundle.js',
			file: 'build/alasql.es5.js',
			format: 'umd'
		},
		plugins: [
			//typescript(),
			//replace({
				//"PACKAGE_VERSION": require('./package.json').version
			//}),
			//hashbang(),
			//progress(),
			resolve(), 
			/*closure({
				        languageIn: 'ECMASCRIPT6',
				        languageOut: 'ECMASCRIPT5',
				        compilationLevel: 'ADVANCED',
				        warningLevel: 'VERBOSE',
				        env:'CUSTOM',
    		}),*/
    		//buble(),
    		//uglify({}),
			//filesize(),
			//commonjs() // so Rollup can convert `ms` to an ES module
		]
	},/*{
		input: 'src/multiversion.cli.js',
		output: {
			name: 'rexreplace_cli',
			file: 'build/rexreplace.cli.js',
			format: 'iife'
		}
	},*/

];
