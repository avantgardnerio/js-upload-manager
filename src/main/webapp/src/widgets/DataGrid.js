/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A bindable DataGrid
 */
define(function(require, exports, module) {

    var RowRenderer = require('renderers/RowRenderer');

    var DataGrid = function(columnNames) {

        var self = {};

        // ----------------------------------------- Private members --------------------------------------------------
        var table = $('<table/>');
        var header = $('<tr/>')
        var dataSource = {};
        var renderer = new RowRenderer(columnNames);

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.setDataSource = function(ds) {
            dataSource = ds;
            dataSource.addEventListener('listChange', render)
        };

        self.getElement = function() {
            return table;
        };

        // ----------------------------------------- Private methods --------------------------------------------------
        var clear = function() {
            table.find('tr').each(function(i, tr) {
                if(i > 0) {
                    tr.remove();
                }
            });
        };

        var render = function() {
            clear();
            for(var i = 0; i < dataSource.getLength(); i++) {
                var item = dataSource.getItemAt(i);
                var row = renderer.render(i, item);
                table.append(row);
            }
        };

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
            table.append(header);
            table.addClass('dataGrid');

            for(var i = 0; i < columnNames.length; i++) {
                var column = columnNames[i];
                var th = $('<th/>').html(column);
                header.append(th);
            }
        };

        ctor();

        return self;
    };

    return DataGrid;
});