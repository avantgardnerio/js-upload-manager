/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A DataGrid renderer specific to files
 */
define(function(require, exports, module) {

    var RowRenderer = require('renderers/RowRenderer');

    var FileRenderer = function(columnNames) {

        var self = new RowRenderer(columnNames);

        // ----------------------------------------- Private members --------------------------------------------------
        var curentPath = '';

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.render = function(index, item) {
            var row = $('<tr/>');
            for(var i = 0; i < columnNames.length; i++) {
                var column = columnNames[i];
                var val = item[column];
                if(column === 'href') {
                    var path = val.substr(curentPath.length);
                    var link = val;
                    if(path === '') {
                        path = '.';
                    }
                    if(item.contentType === 'httpd/unix-directory') {
                        link = 'javascript:alert("hi");';
                    }
                    row.append($('<td/>').append($('<a/>').attr('href', link).text(path)));
                } else {
                    self.addCell(row, val);
                }
            }
            return row;
        };

        self.setPath = function(val) {
            curentPath = val;
        };

        // ----------------------------------------- Private methods --------------------------------------------------

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
        };

        ctor();

        return self;
    };

    return FileRenderer;
});