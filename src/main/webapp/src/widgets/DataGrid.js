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

    var ChangeEvent = require('events/ChangeEvent');
    var EventDispatcher = require('events/EventDispatcher');
    var SelectionEvent = require('events/SelectionEvent');

    var RowRenderer = require('renderers/RowRenderer');

    var Animator = require('real/Animator');

    var DataGrid = function(columnNames) {

        var self = new EventDispatcher();

        // ----------------------------------------- Private members --------------------------------------------------
        var table = $('<table/>');
        var header = $('<th/>')
        var dataSource = null;
        var selectedItems = [];
        var renderer = new RowRenderer(columnNames);

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.setDataSource = function(val) {
            if(dataSource !== null) {
                dataSource.removeEventListener(ChangeEvent.TYPE, render);
            }
            dataSource = val;
            dataSource.addEventListener(ChangeEvent.TYPE, render);
        };

        self.setRenderer = function(val) {
            if(renderer) {
                renderer.removeEventListener(SelectionEvent.TYPE, render);
            }
            renderer = val;
            renderer.addEventListener(SelectionEvent.TYPE, onSelect);
        };

        self.getElement = function() {
            return table;
        };

        self.getSelectedItems = function() {
            return selectedItems;
        };

        // ----------------------------------------- Private methods --------------------------------------------------
        var onSelect = function(ev) {
            var item = ev.getItem();
            if(ev.getSelected()) {
                if(selectedItems.indexOf(item) < 0) {
                    selectedItems.push(item);
                }
            } else {
                var index = selectedItems.indexOf(item);
                if(index >= 0) {
                    selectedItems.splice(index, 1);
                }
            }
            invalidate();
            self.dispatch(ev);
        };

        var clear = function() {
            table.find('tr').each(function(i, tr) {
                tr.remove();
            });
        };

        var addHeaders = function() {
            for(var i = 0; i < columnNames.length; i++) {
                var column = columnNames[i];
                var th = $('<th/>').html(column);
                header.append(th);
            }
        };

        var addRecords = function() {
            if(dataSource === null) {
                return;
            }
            for(var i = 0; i < dataSource.getLength(); i++) {
                var item = dataSource.getItemAt(i);
                var row = renderer.render(i, item, selectedItems);
                table.append(row);
            }
        };

        var render = function() {
            clear();
            addHeaders();
            addRecords();
        };

        var invalidate = function() {
            Animator.requestAnimationFrame(render);
        };

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
            table.append(header);
            table.addClass('dataGrid');
            invalidate();
        };

        ctor();

        return self;
    };

    return DataGrid;
});