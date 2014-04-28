/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'collections/RingBuffer'
], function (
    RingBuffer
    ) {
    describe('RingBuffer', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var ring = new RingBuffer();
            expect(ring).toBeDefined();
        });

        it('should average', function () {
            var ring = new RingBuffer(2);
            for(var i = 0; i < 3; i++) {
                ring.add(i);
            }
            expect(ring.average()).toEqual(2);
        });

    });
});
