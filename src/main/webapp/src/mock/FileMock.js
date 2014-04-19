/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define(function(require, exports, module) {
    return function(name, type, data) {
        var self = {};

        self.name = name;
        self.type = type;

        self.getName = function() {
            return name;
        };

        self.getType = function() {
            return type;
        };

        self.getData = function() {
            return data;
        };

        return self;
    };
});
