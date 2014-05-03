/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define(function (require, exports, module) {

    var List = require('collections/List');

    var SelectionEvent = require('events/SelectionEvent');

    var DataGrid = require('widgets/DataGrid');

    describe('DataGrid', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var grid = new DataGrid([]);
            var list = new List();
            grid.setDataSource(list);
            expect(grid).toBeDefined();
        });

        it('should be bindable', function () {
            var grid = new DataGrid([]);
            var list = new List();
            grid.setDataSource(list);

            var table = grid.getElement();
            expect(table.find('tr').size()).toEqual(1);

            list.addItem({});

            expect(table.find('tr').size()).toEqual(2);
        });

        it('should render headers only once', function () {
            var grid = new DataGrid(['foo']);
            var table = grid.getElement();

            expect(table.find('th').size()).toEqual(1);
            grid.setDataSource(new List());
            expect(table.find('th').size()).toEqual(1);
        });

        it('should lose selection on change', function () {

            var item1 = {};
            var item2 = {};

            // Create grid
            var grid = new DataGrid([]);
            var list = new List();
            list.addItem(item1);
            grid.setDataSource(list);

            // Create mock renderer
            var cb = null;
            var renderer = {
                addEventListener: function(type, callback) {
                    cb = callback;
                },
                render: function(index, item, selected) {
                }
            };
            grid.setRenderer(renderer);

            // Select first item in the list
            expect(grid.getSelectedItems().length).toEqual(0);
            var ev = new SelectionEvent(item1, true);
            cb(ev);
            expect(grid.getSelectedItems().length).toEqual(1);

            // Add an item to the list, and expect selection to be cleared
            list.addItem(item2);
            expect(grid.getSelectedItems().length).toEqual(0);
        });

    });
});
