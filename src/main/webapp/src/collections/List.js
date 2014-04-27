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

    var ChangeEvent = require('events/ChangeEvent');
    var EventDispatcher = require('events/EventDispatcher');

    var List = function() {

        var self = new EventDispatcher();

        var items = [];

        var fireChange = function() {
            self.dispatch(new ChangeEvent());
        };

        self.clear = function() {
            items = [];
            fireChange();
        };

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

        self.sort = function(comparator) {
            items.sort(comparator);
            fireChange();
        };

        return self;
    };

    return List;
});