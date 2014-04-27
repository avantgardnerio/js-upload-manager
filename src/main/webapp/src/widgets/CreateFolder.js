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

        // --------------------------------------- Private members ----------------------------------------------------
        var el = $('<div/>');
        var tbFilename;

        // --------------------------------------- Public methods -----------------------------------------------------
        self.getElement = function() {
            return el;
        };

        self.show = function() {
            tbFilename.val('');
            el.show();
        };

        self.hide = function() {
            el.hide();
        };

        self.getText = function() {
            return tbFilename.val();
        };

        // ----------------------------------------- Private methods --------------------------------------------------
        var onCancel = function() {
            self.hide();
            self.dispatch(new Event('cancel'));
        };

        var onCreate = function() {
            self.hide();
            self.dispatch(new Event('create'));
        };

        // ---------------------------------------------- Constructor -------------------------------------------------
        var ctor = function() {
            el.hide();
            el.load('templates/CreateFolder.html', function() {
                el.find('.btnCancel').click(onCancel);
                el.find('.btnCreate').click(onCreate);
                tbFilename = el.find(':text');
            });
        };

        ctor();

        return self;
    };

    return CreateFolder;
});