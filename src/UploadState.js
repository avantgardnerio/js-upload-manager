var UploadState = function() {
    var BANDWIDTH_SAMPLE_COUNT = 10;

    var NAME_KEY = 'filename';
    var MIME_KEY = 'mimeType';
    var POSITION_KEY = 'position';
    var DATA_KEY = 'data';

    var self = {};

    var data = null;
    var chunkSize = null;
    var startTime = null;
    var bytesPerSecond = new RingBuffer(BANDWIDTH_SAMPLE_COUNT);

    self.clear = function() {
        data = null;
        localStorage.clear();
    };

    // ---------------------------------------------------- Data ------------------------------------------------------

    self.getData = function() {
        if(data === null) {
            var base64 = localStorage.getItem(DATA_KEY);
            if(!base64) {
                return null;
            }
            try {
                data = exports.decode(base64);
            } catch(ex) {
                data = null;
                console.log('Error parsing data, state was corrupted: ' + ex)
            }
        }
        return data;
    };

    self.setData = function(value) {
        data = value;
        var base64 = exports.encode(data);
        localStorage.setItem(DATA_KEY, base64);
    };

    self.getLength = function() {
        var data = self.getData();
        if(data === null) {
            return 0;
        }
        return data.byteLength;
    };

    // ----------------------------------------------- Calculations ---------------------------------------------------

    self.getRatio = function() {
        if(self.getLength() === 0) {
            return 0;
        }
        return self.getPosition() / self.getLength();
    };

    self.getPercent = function() {
        return self.getRatio() * 100;
    };

    self.getPercentText = function() {
        return self.getPercent() + "%";
    };

    // ------------------------------------------- Persistent state ---------------------------------------------------
    self.getPosition = function() {
        var value = localStorage.getItem(POSITION_KEY);
        if(!value) {
            return 0;
        }
        return parseInt(value);
    };

    self.setPosition = function(value) {
        localStorage.setItem(POSITION_KEY, value);
    };


    self.getFilename = function() {
        return localStorage.getItem(NAME_KEY);
    };

    self.setFilename = function(value) {
        localStorage.setItem(NAME_KEY, value);
    };


    self.getMimeType = function() {
        var value = localStorage.getItem(MIME_KEY);
        if ( !value || value == '' ) {
            return 'application/octet-stream';
        }
        return value;
    };

    self.setMimeType = function(value) {
        localStorage.setItem(MIME_KEY, value);
    };

    // -------------------------------------------- Transient state ---------------------------------------------------
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