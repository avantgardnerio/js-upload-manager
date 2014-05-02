/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * The default renderer for DataGrid rows
 */
define(function(require, exports, module) {

    var EventDispatcher = require('events/EventDispatcher');

    var $ = require('jquery');

    var RowRenderer = function(colNames) {

        var self = new EventDispatcher();

        // ----------------------------------------- Private members --------------------------------------------------

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.render = function(index, item) {
            var row = $('<tr/>');
            for(var i = 0; i < colNames.length; i++) {
                var colName = colNames[i];
                var val = item[colName];
                row.append($('<td/>').html(val));
            }
            return row;
        };

        // ----------------------------------------- Private methods --------------------------------------------------

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
        };

        ctor();

        return self;
    };

    return RowRenderer;
});