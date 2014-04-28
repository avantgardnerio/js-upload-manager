/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'events/Event'
], function (
    Event
    ) {
    describe('Event', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var ev = new Event();
            expect(ev).toBeDefined();
        });

        it('should have the correct type', function () {
            var ev = new Event('foo');
            expect(ev.getType()).toEqual('foo');
        });

    });
});
