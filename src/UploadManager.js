/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A resilient upload manager that keeps files in local storage until uploads can be completed
 *
 * @param fileReaderMock A mock FileReader, or null
 * @param xmlHttpRequestMock A mock XMLHttpRequest, or null
 * @param windowMock A mock timer, or null
 * @returns {{}} The UploadManager
 * @constructor
 */
var UploadManager = function(fileReaderMock, xmlHttpRequestMock, windowMock) {
    var self = {};

    // Mocks
    // TODO: DI framework
    var FileReader = fileReaderMock || FileReader;
    var XMLHttpRequest = xmlHttpRequestMock || XMLHttpRequest;
    var window = windowMock || window;

    // Upload constants
    var CHUNK_SIZE = 20 * 1024;     // Set as needed according to bandwidth & latency
    var POLL_INTERVAL = 10;         // Set as needed according to bandwidth & latency
    var POST_URL = 'upload.php';
    var timer = null;

    /**
     * Puts a file in the upload queue
     * @param file The file to enqueue
     */
    self.enqueue = function(file) {
        // Save meta data
        var state = new UploadState(self.nextKey());
        state.setFilename(file.name);
        state.setMimeType(file.type);
        state.setPosition(0);
        state.save();

        // Read the file from the disk
        var reader = new FileReader();
        reader.onload = function(ev) {
            var data = ev.target.result;
            state.setData(data);
            state.save();
        };
        reader.readAsArrayBuffer(file);
    };

    /**
     * Starts uploading the file queue to the server
     */
    self.upload = function() {
        if(timer !== null) {
            return; // Already running
        }
        timer = window.setInterval(poll, POLL_INTERVAL);
    };

    /**
     * Stops any uploads in progress
     */
    self.stop = function() {
        if(timer === null) {
            return;
        }
        window.clearInterval(timer);
        timer = null;
    };

    /**
     * Removes all pending uploads from local storage
     */
    self.clear = function() {
        for(var key in localStorage) {
            if(!isInt(key)) {
                continue;
            }
            localStorage.removeItem(key);
        }
    };

    /**
     * Event listener for progress
     */
    self.onProgress = function() {
    };

    /**
     * Event listener for completion
     */
    self.onFileComplete = function() {
    };

    var isInt = function(value) {
        return value == parseInt(value);
    };

    /**
     * @returns {number} The key of the next file to upload
     */
    self.minKey = function() {
        var min = Math.pow(2, 32);
        for(var key in localStorage) {
            if(!isInt(key)) {
                continue;
            }
            min = Math.min(min, parseInt(key));
        }
        return min;
    };

    /**
     * @returns {number} The key of the current upload, or 0
     */
    self.activeKey = function() {
        var max = 0;
        for(var key in localStorage) {
            max = Math.max(max, parseInt(key));
        }
        return max;
    };

    /**
     * @returns {number} The key where the next upload should be stored
     */
    self.nextKey = function() {
        return self.activeKey() + 1;
    };

    /**
     * @returns {UploadState|null} The current thing to upload, or null
     */
    self.getCurrentUpload = function() {
        // See if there are things to upload
        var minKey = self.minKey();
        if(minKey === 0) {
            return null;
        }

        // Grab the next thing to upload
        var state = new UploadState(minKey);
        if(state.getLength() === 0) {
            return null; // File data not yet loaded
        }

        return state;
    };

    /**
     * @param state The upload state
     * @returns {number} The index+1 of the last byte to send
     */
    var getNextEnd = function(state) {
        var nextPos = state.getPosition() + CHUNK_SIZE;
        return Math.min(nextPos, state.getLength());
    };

    /**
     * @param state The upload state
     * @returns {number} The size of the next chunk to upload
     */
    var getNextChunkSize = function(state) {
        var end = getNextEnd(state);
        var chunkSize = end - state.getPosition();
        return chunkSize;
    };

    var completeUpload = function(state) {
        state.free();
        updateStatus();
        self.onFileComplete();
    };

    /**
     * Called periodically to check for work, and advance if possible
     */
    var poll = function() {
        // Get the current upload state
        var state = self.getCurrentUpload();
        if(state === null) {
            return; // Nothing to upload, or data still being loaded from disk
        }

        // Grab the next chunk to upload
        var chunk = getNextChunkSize(state);
        if(chunk === null) {
            completeUpload(state);
            return;
        }

        // Upload it!
        sendNextChunk(state);
    };

    /**
     * @param state The upload state
     * @returns {Uint8Array|null} The next chunk to upload, or null
     */
    var getNextChunk = function(state) {
        var chunkSize = getNextChunkSize(state);
        if(chunkSize <= 0) {
            return null;
        }
        var abv = new Uint8Array(state.getData(), state.getPosition(), chunkSize);
        return abv;
    };

    var sendNextChunk = function(state) {
        var abv = getNextChunk(state);
        state.startUpload(abv.size);
        var req = createNextRequest(state);
        req.send(abv);
    };

    var buildContentRange = function(state) {
        var end = getNextEnd(state);

        var text = 'bytes ';
        text += state.getPosition();
        text += '-';
        text += (end-1);
        text += '/';
        text += state.getLength();

        return text;
    };

    var createNextRequest = function(state) {

        var req = new XMLHttpRequest();
        req.addEventListener('progress', updateProgress, false);
        req.addEventListener('load', transferComplete, false);
        req.addEventListener('error', transferFailed, false);
        req.addEventListener('abort', transferCanceled, false);
        req.open('POST', POST_URL, true);

        var contentRange = buildContentRange(state);
        req.setRequestHeader('HTTP_X_FILENAME', state.getFilename());
        req.setRequestHeader('Content-Range', contentRange);
        req.overrideMimeType(state.getMimeType());

        return req;
    };

    var freeRequest = function(ev) {
        var req = ev.target;
        req.removeEventListener('progress', updateProgress);
        req.removeEventListener('load', transferComplete);
        req.removeEventListener('error', transferFailed);
        req.removeEventListener('abort', transferCanceled);
        delete req;
    };

    // -------------------------------------------- Status events -----------------------------------------------------
    var updateProgress = function(ev) {
        // TODO: Fire onProgress?
    };

    var transferComplete = function(ev) {
        var state = self.getCurrentUpload();
        state.endUpload();
        updateStatus();
        state.setPosition(state.getPosition() + CHUNK_SIZE);
        freeRequest(ev);
    };

    var transferFailed = function(ev) {
        var state = self.getCurrentUpload();
        state.endUpload();
        freeRequest(ev);
    };

    var transferCanceled = function(ev) {
        var state = self.getCurrentUpload();
        state.endUpload();
        freeRequest(ev);
    };

    var updateStatus = function() {
        var state = self.getCurrentUpload();
        self.onProgress(state);
        freeRequest(ev);
    };

    return self;
};