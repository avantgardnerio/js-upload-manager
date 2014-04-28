/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'filters/DefaultFilter'
], function (
    DefaultFilter
    ) {
    describe('DefaultFilter', function () {

        it('should callback', function () {
            var filter = new DefaultFilter();
            var val = null;
            var callback = function(data) {
                val = data;
            };
            filter.onLoad('foo', callback);
            expect(val).toEqual('foo');
        });

    });
});
