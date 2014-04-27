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

    var RowRenderer = function(columnNames) {

        var self = {};

        // ----------------------------------------- Private members --------------------------------------------------

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.render = function(index, item) {
            var row = $('<tr/>');
            for(var i = 0; i < columnNames.length; i++) {
                var column = columnNames[i];
                var val = item[column];
                if(i == 0) {
                    // TODO: Column types
                    row.append($('<td/>').append($('<a/>').attr('href', val).text(val)));
                } else {
                    addCell(row, val);
                }
            }
            return row;
        };

        // ----------------------------------------- Private methods --------------------------------------------------
        var addCell = function(row, el) {
            var text = el ? el.textContent : '';
            row.append($('<td/>').html(text));
        };

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
        };

        ctor();

        return self;
    };

    return RowRenderer;
});