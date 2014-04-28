/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'events/Event',
    'events/EventDispatcher'
], function (Event, EventDispatcher) {
    describe('EventDispatcher', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var ev = new EventDispatcher();
            expect(ev).toBeDefined();
        });

        it('should dispatch', function () {
            var ev = new EventDispatcher();
            var count = 0;
            ev.addEventListener('foo', function (ev) {
                count++;
            });
            ev.dispatch(new Event('foo'));
            expect(count).toEqual(1);
        });

        it('should handle exceptions', function () {
            var ev = new EventDispatcher();
            var e = null;
            try {
                ev.addEventListener('foo', function (ev) {
                    throw new Error('test');
                });
                ev.dispatch(new Event('foo'));
            } catch (ex) {
                e = ex;
            }
            expect(e).toBeNull();
        });

        it('should stop dispatching', function () {
            var ev = new EventDispatcher();
            var count = 0;
            var func = function (ev) {
                count++;
            };

            ev.addEventListener('foo', func);
            ev.dispatch(new Event('foo'));
            ev.removeEventListener('foo', func);
            ev.dispatch(new Event('foo'));

            expect(count).toEqual(1);
        });

    });
});
