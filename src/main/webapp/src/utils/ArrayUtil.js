/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A handy utility class for dealing with arrays
 */
define(function (require, exports, module) {

    var ArrayUtil = function () {
    };

    ArrayUtil.each = function (ar, callback) {
        for (var i = 0; i < ar.length; i++) {
            var item = ar[i];
            callback(item);
        }
    };

    return ArrayUtil;
});