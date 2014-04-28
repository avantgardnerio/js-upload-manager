/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'events/ChangeEvent'
], function (
    ChangeEvent
    ) {
    describe('ChangeEvent', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var ev = new ChangeEvent();
            expect(ev).toBeDefined();
        });

        it('should have the correct type', function () {
            var ev = new ChangeEvent();
            expect(ev.getType()).toEqual(ChangeEvent.TYPE);
        });

    });
});
