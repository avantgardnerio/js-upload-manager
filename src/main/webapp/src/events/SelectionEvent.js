/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * An event that can be fired when something is selected
 */
define(function(require, exports, module) {

    var Event = require('events/Event');

    var TYPE = 'select';

    var SelectionEvent = function(item, selected) {

        var self = new Event(TYPE);

        self.getItem = function() {
            return item;
        };

        self.getSelected = function() {
            return selected;
        };

        return self;
    };

    SelectionEvent.TYPE = TYPE;

    return SelectionEvent;
});