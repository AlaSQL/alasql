/*
 * JavaScript MD5 Demo JS 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global window, $ */

$(function () {
    'use strict';

    $('#calculate').on('click', function (event) {
        event.preventDefault();
        $('#result').val(window.md5($('#input').val()));
    });
    $('#input').val('日本');

});
