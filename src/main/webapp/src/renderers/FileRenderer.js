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

    var SelectionEvent = require('events/SelectionEvent');

    var RowRenderer = require('renderers/RowRenderer');

    var FileRenderer = function(colNames) {

        var self = new RowRenderer(colNames);

        // ----------------------------------------- Private members --------------------------------------------------
        var curentPath = '';

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.render = function(index, item, selectedItems) {
            var row = $('<tr/>');
            for(var i = 0; i < colNames.length; i++) {
                var colName = colNames[i];
                var text = item.getProp(colName);
                var cell = $('<td/>');
                if(colName === 'href') {
                    createLink(text, item, cell, selectedItems);
                } else {
                    cell.html(text);
                }
                row.append(cell);
            }
            return row;
        };

        self.setPath = function(val) {
            curentPath = val;
        };

        // ----------------------------------------- Private methods --------------------------------------------------
        var createLink = function(text, item, cell, selectedItems) {
            var link = $('<a/>');

            // Calculate path
            var path = text.substr(curentPath.length);
            var href = text;
            if (path === '') {
                path = '.';
            }
            if (item.getContentType() === 'httpd/unix-directory') {
                href = '#path=' + item.getPath();
                link.click(function() {
                    self.dispatch(new SelectionEvent(item, true));
                });
            }
            var selected = selectedItems.indexOf(item) >= 0;

            // Checkbox
            var checkbox = $('<input/>');
            checkbox.attr('type', 'checkbox');
            checkbox.prop('checked', selected);
            checkbox.click(function() {
                var checked = checkbox.prop('checked');
                self.dispatch(new SelectionEvent(item, checked));
            });
            cell.append(checkbox);

            // Link
            link.attr('href', href).text(path);
            cell.append(link);
        };

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
        };

        ctor();

        return self;
    };

    return FileRenderer;
});