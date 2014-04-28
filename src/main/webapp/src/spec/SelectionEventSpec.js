/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'events/SelectionEvent'
], function (
    SelectionEvent
    ) {
    describe('SelectionEvent', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var ev = new SelectionEvent();
            expect(ev).toBeDefined();
        });

        it('should have the correct type', function () {
            var ev = new SelectionEvent();
            expect(ev.getType()).toEqual(SelectionEvent.TYPE);
        });

        it('should carry the selected item', function () {
            var ev = new SelectionEvent('foo');
            expect(ev.getItem()).toEqual('foo');
        });

        it('should carry the selected flag', function () {
            var ev = new SelectionEvent('foo', true);
            expect(ev.getSelected()).toBeTruthy();
        });

    });
});
