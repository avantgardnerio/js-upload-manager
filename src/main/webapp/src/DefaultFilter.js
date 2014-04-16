/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
var DefaultFilter = function() {
    var self = {};

    self.onLoad = function(data, callback) {
        callback(data);
    };

    return self;
};