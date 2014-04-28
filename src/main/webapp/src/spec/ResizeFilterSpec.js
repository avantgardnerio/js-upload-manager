/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'filters/ResizeFilter',
    'resource/Resources'
], function (
    ResizeFilter,
    Resources
    ) {
    describe('ResizeFilter', function () {

        beforeEach(function () {
        });

        it('should be able to resize', function () {
            var filter = new ResizeFilter();
            var data = null;
            filter.onLoad(Resources.getImage1(), function (ret) {
                data = ret;
            });
            expect(data).toBeDefined();
        });

    });
});
