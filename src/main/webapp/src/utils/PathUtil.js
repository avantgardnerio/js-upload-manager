/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A handy utility class for dealing with Paths
 */
define(function (require, exports, module) {

    var StringUtil = require('utils/StringUtil');

    var PathUtil = function () {
    };

    PathUtil.getParentPath = function (path) {
        // Take off trailing slash
        if (StringUtil.endsWith(path, '/')) {
            path = path.substring(0, path.length - 1);
        }

        // Truncate to last slash before it
        var index = path.lastIndexOf('/');
        path = path.substring(0, index);

        // Add a slash turning it back into a directory
        path += '/';
        return path;
    };

    return PathUtil;
});