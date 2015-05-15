/*
 * JavaScript MD5 Gruntfile
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'js/demo.js',
                'js/md5.js',
                'test/test.js'
            ]
        },
        simplemocha: {
            options: {
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: ['test/test.js']
            }
        },
        mocha: {
            all: {
                src: ['test/index.html'],
                options: {
                    run: true,
                    bail: true,
                    log: true,
                    reporter: 'Spec'
                },
                mocha: {
                    ignoreLeaks: false
                }
            }
        },
        uglify: {
            production: {
                src: [
                    'js/md5.js'
                ],
                dest: 'js/md5.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bump-build-git');

    grunt.registerTask('test', ['jshint', 'simplemocha', 'mocha']);
    grunt.registerTask('default', ['test', 'uglify']);

};
