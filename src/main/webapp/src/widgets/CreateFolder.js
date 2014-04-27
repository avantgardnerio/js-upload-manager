/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A WebDAV folder browser
 */
define(function(require, exports, module) {

    var Event = require('events/Event');
    var EventDispatcher = require('events/EventDispatcher');

    var CreateFolder = function() {

        var self = new EventDispatcher();

        var el = $('<div/>');
        el.hide();

        self.getElement = function() {
            return el;
        };

        self.show = function() {
            el.show();
        };

        self.hide = function() {
            el.hide();
        };

        var onCancel = function() {
            self.dispatch(new Event('cancel'));
        };

        var onCreate = function() {
            self.dispatch(new Event('create'));
        };

        var ctor = function() {
            el.load('templates/CreateFolder.html', function() {
                el.find('.btnCancel').click(onCancel);
                el.find('.btnCreate').click(onCreate);
            });
        };

        ctor();

        return self;
    };

    return CreateFolder;
});