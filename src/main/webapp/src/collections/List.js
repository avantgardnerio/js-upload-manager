/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * An event dispatching base class
 */
define(function(require, exports, module) {

    var EventDispatcher = require('events/EventDispatcher');

    return function() {

        var self = new EventDispatcher();

        var items = [];

        var fireChange = function() {
            var ev = {
                'type': 'listChange'
            };
            self.dispatch(ev);
        };

        self.clear = function() {
            items = [];
            fireChange();
        }

        self.addItem = function(item) {
            items.push(item);
            fireChange();
        };

        self.getLength = function() {
            return items.length;
        };

        self.getItemAt = function(index) {
            return items[index];
        };

        return self;
    }
});