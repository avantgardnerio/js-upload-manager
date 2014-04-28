/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'events/ProgressEvent'
], function (
    ProgressEvent
    ) {
    describe('ProgressEvent', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var ev = new ProgressEvent();
            expect(ev).toBeDefined();
        });

        it('should carry the selected item', function () {
            var ev = new ProgressEvent('foo');
            expect(ev.getStatus()).toEqual('foo');
        });

    });
});
