/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define(
    [
        'lib/Base64'
    ],
    function (Base64) {

        var Canvas = {};

        var TARGET_FORMAT = 'image/jpeg';
        var URL_PREFIX = 'data:' + TARGET_FORMAT + ';base64,';

        Canvas.create = function () {
            var cnv = {};

            var data = null;

            cnv.getContext = function () {
                var ctx = {};

                ctx.drawImage = function (img) {
                    data = img;
                };

                return ctx;
            };

            cnv.toDataURL = function () {
                return URL_PREFIX + Base64.encode(data); // Don't bother resizing for test
            };

            return cnv;
        };

        return Canvas;
    }
);