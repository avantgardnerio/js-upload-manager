/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A handy utility class for dealing with Strings
 */
define(function (require, exports, module) {

    var StringUtil = function () {
    };

    StringUtil.endsWith = function (text, suffix) {
        return text.indexOf(suffix, text.length - suffix.length) !== -1;
    };

    return StringUtil;
});