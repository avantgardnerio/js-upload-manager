/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define(function (require, exports, module) {

    var $ = require('jquery');

    var mockResponse;

    $.setResponse = function(response) {
        mockResponse = response;
    };

    $.ajax = function (args) {
        var xhr = {};
        xhr.setRequestHeader = function (key, val) {

        };

        args.beforeSend(xhr);

        args.success(mockResponse);
    };

    return $;
});
