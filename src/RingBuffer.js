/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
var RingBuffer = function(size) {
    var self = {};

    var ar = [];
    var position = 0;

    self.add = function(item) {
        ar[position] = item;
        position = (position + 1) % size;
        console.log("position=" + position + " size=" + ar.length);
    };

    self.average = function() {
        var count = 0;
        for(var i = 0; i < ar.length; i++) {
            count += ar[i];
        }
        return Math.round(count / ar.length);
    };

    return self;
};
