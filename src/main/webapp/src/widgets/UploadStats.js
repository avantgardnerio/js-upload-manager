/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A widget that displays statistics about uploads
 */
define(function(require, exports, module) {

    var UploadStats = function() {

        var self = {};

        // --------------------------------------- Private members ----------------------------------------------------
        var el = $('<div/>');

        // --------------------------------------- Public methods -----------------------------------------------------
        self.getElement = function() {
            return el;
        };

        self.setState = function(state) {
            if(state) {
                el.find(".tdFilename").html(state.getFilename());
                el.find(".tdMimeType").html(state.getMimeType());
                el.find(".tdPosition").html(state.getPosition());
                el.find(".tdLength").html(state.getLength());
                //el.find(".tdBandwidth").html(manager.getKbps()); // TODO: Put bandwidth back
            } else {
                //el.find(".tdFilename").html('');
                //el.find(".tdMimeType").html('');
                //el.find(".tdPosition").html('');
                el.find(".tdLength").html('');
                //el.find(".tdBandwidth").html('');
            }
        };

        // ----------------------------------------- Private methods --------------------------------------------------

        // ---------------------------------------------- Constructor -------------------------------------------------
        var ctor = function() {
            el.load('templates/UploadStats.html', function() {
            });
        };

        ctor();

        return self;
    };

    return UploadStats;
});