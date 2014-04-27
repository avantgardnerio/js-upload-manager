/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * An event that can be fired to show progress is made
 */
define(function(require, exports, module) {

    var Event = require('events/Event');

    var TYPE = 'progress';

    var ProgressEvent = function(status) {

        var self = new Event(TYPE);

        self.getStatus = function() {
            return status;
        };

        return self;
    };

    ProgressEvent.TYPE = TYPE;

    return ProgressEvent;
});