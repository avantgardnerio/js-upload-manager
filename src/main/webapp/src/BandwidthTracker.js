/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
var BandwidthTracker = function() {
    var self = {};

    // Bandwidth constants
    var BANDWIDTH_SAMPLE_COUNT = 10;

    // Bandwidth
    var chunkSize = null;
    var startTime = null;
    var bytesPerSecond = new RingBuffer(BANDWIDTH_SAMPLE_COUNT);

    self.startUpload = function(size) {
        chunkSize = size;
        startTime = new Date().getTime();
    };

    self.endUpload = function() {
        var end = new Date().getTime();
        var elapsedMs = end - startTime;
        var elapsedSec = elapsedMs / 1000;
        bytesPerSecond.add(Math.round(chunkSize / elapsedSec));
        startTime = null;
    };

    self.isUploading = function() {
        return startTime !== null;
    };

    self.getBytesPerSecond = function() {
        return bytesPerSecond.average();
    };

    self.getBitsPerSecond = function() {
        return self.getBytesPerSecond() * 8;
    };

    self.getKbps = function() {
        return Math.round(self.getBitsPerSecond() / 1024);
    };

    self.getMpbs = function() {
        return Math.round(self.getKbps() / 1024);
    };

    return self;
};