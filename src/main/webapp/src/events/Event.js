/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A base event class
 */
define(function(require, exports, module) {

    var Event = function(type) {

        var self = {};

        self.getType = function() {
            return type;
        };

        return self;
    };

    return Event;
});