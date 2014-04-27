/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A simple progress bar widget
 */
define(function(require, exports, module) {

    var ProgressBar = function() {

        var self = {};

        // --------------------------------------- Private members ----------------------------------------------------
        var el = $('<div/>');

        // --------------------------------------- Public methods -----------------------------------------------------
        self.getElement = function() {
            return el;
        };

        self.setPercent = function(val) {
            el.find('div').width(val + '%');
        };

        // ----------------------------------------- Private methods --------------------------------------------------

        // ---------------------------------------------- Constructor -------------------------------------------------
        var ctor = function() {
            el.addClass('progressBar');
            el.append($('<div/>'));
        };

        ctor();

        return self;
    };

    return ProgressBar;
});