/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'collections/List'
], function (
    List
    ) {
    describe('List', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var list = new List();
            expect(list).toBeDefined();
        });

        it('should accept new items', function () {
            var list = new List();
            expect(list.getLength()).toEqual(0);
            list.addItem('foo');
            expect(list.getLength()).toEqual(1);
        });

        it('should clear', function () {
            var item = 'foo';
            var list = new List();
            expect(list.getLength()).toEqual(0);
            list.addItem(item);
            expect(list.getLength()).toEqual(1);
            list.clear();
            expect(list.getLength()).toEqual(0);
        });

        it('should be sortable', function () {
            var item1 = 'foo';
            var item2 = 'bar';
            var list = new List();

            list.addItem(item1);
            list.addItem(item2);

            list.sort(function(left, right) {
                if(left < right) {
                    return -1;
                }
                if(left > right) {
                    return 1;
                }
                return 0;
            });

            expect(list.getItemAt(0)).toEqual(item2);
            expect(list.getItemAt(1)).toEqual(item1);
        });

        it('should be copyable', function () {
            var item1 = 'foo';
            var item2 = 'bar';
            var list = new List();

            list.addItem(item1);
            list.addItem(item2);

            var list2 = new List();
            list2.copy(list);

            expect(list2.getLength()).toEqual(2);
        });

        it('should be iterable', function () {
            var item1 = 'foo';
            var item2 = 'bar';
            var list = new List();

            list.addItem(item1);
            list.addItem(item2);

            var count = 0;
            list.each(function(item) {
                count++;
            });

            expect(count).toEqual(2);
        });

    });
});
