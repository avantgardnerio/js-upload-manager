/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * An event that can be fired when something is changed
 */
define(function(require, exports, module) {

    var Event = require('events/Event');

    var TYPE = 'change';

    var ChangeEvent = function() {

        var self = new Event(TYPE);

        self.getItem = function() {
            return item;
        };

        return self;
    };

    ChangeEvent.TYPE = TYPE;

    return ChangeEvent;
});