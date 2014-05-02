/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A handy utility for copying objects
 */
define(function (require, exports, module) {

    var CopyUtil = {};

    CopyUtil.clone = function (oldObj) {
        var newObj = {};

        for(var key in oldObj) {
            newObj[key] = oldObj[key];
        }

        return newObj;
    };

    return CopyUtil;
});