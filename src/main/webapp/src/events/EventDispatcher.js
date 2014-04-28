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

    var EventDispatcher = function() {

        var self = {};

        var listeners = {};

        self.addEventListener = function(type, listener) {
            var ar = listeners[type];
            if(ar === undefined) {
                ar = [];
            }
            ar.push(listener);
            listeners[type] = ar;
        };

        self.removeEventListener = function(type, listener) {
            var ar = listeners[type];
            if(ar === undefined) {
                ar = [];
            }
            var index;
            while(index = ar.indexOf(listener) >= 0) {
                ar = ar.splice(index, 1);
            }
            if(ar.length > 0) {
                listeners[type] = ar;
            } else {
                delete listeners[type];
            }
        };

        self.dispatch = function(ev) {
            var ar = listeners[ev.getType()];
            if(ar === undefined) {
                return;
            }
            for(var i = 0; i < ar.length; i++) {
                var func = ar[i];
                try {
                    func(ev);
                } catch(ex) {
                    console.error('Error dispatching event', ex);
                }
            }
        };

        return self;
    };

    return EventDispatcher;
});