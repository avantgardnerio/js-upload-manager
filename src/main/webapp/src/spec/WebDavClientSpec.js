/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'webdav/WebDavClient'
], function (
    WebDavClient
    ) {
    describe('WebDavClient', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var c = new WebDavClient();
            expect(c).toBeDefined();
        });

    });
});
