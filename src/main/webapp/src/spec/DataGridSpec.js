/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'collections/List',
    'widgets/DataGrid'
], function (
    List,
    DataGrid
    ) {
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
            expect(table.find('tr').size()).toEqual(0);

            list.addItem({});

            expect(table.find('tr').size()).toEqual(1);
        });

    });
});
