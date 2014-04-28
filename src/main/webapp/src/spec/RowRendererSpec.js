/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'renderers/RowRenderer'
], function (RowRenderer) {
    describe('RowRenderer', function () {

        it('should render href', function () {
            var colNames = ['href', 'foo'];
            var renderer = new RowRenderer(colNames);

            var index = 0;
            var item = {};
            for(var i = 0; i < colNames.length; i++) {
                var name = colNames[i];
                item[name] = '' + i;
            }
            var selectedItems = [];

            var row = renderer.render(index, item, selectedItems);

            // TODO: Test UI better
            expect(row).toBeDefined();
            expect(row.length).toEqual(1);
            var cells = row[0].children;
            expect(cells).toBeDefined();
            expect(cells.length).toEqual(2);
            var cell1 = cells[0];
            var cell2 = cells[1];
            expect(cell1.innerText).toEqual('0');
            expect(cell2.innerText).toEqual('1');
        });

    });
});
