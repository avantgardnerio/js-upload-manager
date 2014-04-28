/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define(
    [
    ],
    function () {

        var Canvas = {};

        Canvas.create = function () {
            return document.createElement('canvas');
        };

        return Canvas;
    }
);