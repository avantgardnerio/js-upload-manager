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

    var DataGrid = function(columnNames) {

        var self = {};

        // ----------------------------------------- Private members --------------------------------------------------
        var table = $('<table/>');
        var header = $('<tr/>')
        var dataSource = {};
        var columns = [];

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
            for(var rowIndex = 0; rowIndex < dataSource.getLength(); rowIndex++) {
                var item = dataSource.getItemAt(rowIndex);
                var row = $('<tr/>');
                for(var colIndex = 0; colIndex < columns.length; colIndex++) {
                    var column = columns[colIndex];
                    var val = item[column];
                    if(colIndex == 0) {
                        // TODO: Column types
                        row.append($('<td/>').append($('<a/>').attr('href', val).text(val)));
                    } else {
                        addCell(row, val);
                    }
                }

                table.append(row);
            }
        };

        var addCell = function(row, el) {
            var text = el ? el.textContent : '';
            row.append($('<td/>').html(text));
        };

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
            table.append(header);
            table.addClass('dataGrid');

            for(var i = 0; i < columnNames.length; i++) {
                var column = columnNames[i];
                columns.push(column);
                var th = $('<th/>').html(column);
                header.append(th);
            }
        };

        ctor();

        return self;
    };

    return DataGrid;
});