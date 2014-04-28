/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define(function(require, exports, module) {

    var ArrayUtil = require('utils/ArrayUtil');

    var RingBuffer = function(size) {
        var self = {};

        var ar = [];
        var position = 0;

        self.add = function (item) {
            ar[position] = item;
            position = (position + 1) % size;
            //console.log("position=" + position + " size=" + ar.length);
        };

        self.average = function () {
            var count = 0;
            ArrayUtil.each(ar, function(item) {
                count += item;
            });
            return Math.round(count / ar.length);
        };

        return self;
    };

    return RingBuffer;
});
