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
 * @param FileReader A FileReader
 * @param XMLHttpRequest A XMLHttpRequest
 * @param window A window object
 * @returns {{}} The UploadManager
 * @constructor
 */
var UploadManager = function(FileReader, XMLHttpRequest, window, localStorage) { // TODO: DI framework
    var self = {};

    // Upload constants
    var CHUNK_SIZE = 20 * 1024;     // Set as needed according to bandwidth & latency
    var POLL_INTERVAL = 10;         // Set as needed according to bandwidth & latency
    var POST_URL = 'upload.php';

    // TODO: Move to utility class
    var INTEGER = {
        'MAX_VALUE': Math.pow(2, 32)
    };

    var timer = null;
    var uploading = false;
    var filters = [new DefaultFilter()];

    // -------------------------------------------- Public API --------------------------------------------------------

    /**
     * Puts a file in the upload queue
     * @param file The file to enqueue
     */
    self.enqueue = function(file) {
        // Save meta data
        var state = new UploadState(nextKey(), localStorage);
        state.setFilename(file.name);
        state.setMimeType(file.type);
        state.setPosition(0);
        state.save();

        // Read the file from the disk
        var reader = new FileReader();
        reader.onload = function(ev) {
            var data = ev.target.result;

            var ar = filters.slice(0);
            var callback = function(data) {
                if(ar.length > 0) {
                    var f2 = ar.pop();
                    f2.onLoad(data, callback);
                } else {
                    state.setData(data);
                    state.save();
                }
            };
            var f1 = ar.pop();
            f1.onLoad(data, callback);
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
        window.clearInterval(timer);
        timer = null;
    };

    /**
     * Removes all pending uploads from local storage
     */
    self.clear = function() {
        for(var key in localStorage) {
            if(!localStorage.hasOwnProperty(key)) {
                continue;
            }
            if(isInt(key)) {
                localStorage.removeItem(key);
            }
        }
    };

    /**
     * Adds an upload processing filter to the chain
     * @param filter The filter to add
     */
    self.addFilter = function(filter) {
        if(filters.indexOf(filter) >= 0) {
            return;
        }
        filters.push(filter);
    };

    // -------------------------------------------------- Events ------------------------------------------------------

    /**
     * Event listener for progress
     */
    self.onProgress = function(state) {
    };

    /**
     * Event listener for completion
     */
    self.onFileComplete = function() {
    };

    // ------------------------------------------------ Private methods -----------------------------------------------

    // TODO: Move to utility class
    var isInt = function(value) {
        if(isNaN(value)) {
            return false;
        }
        return value == parseInt(value);
    };

    /**
     * @returns {number} The key of the next file to upload
     */
    var minKey = function() {
        var min = INTEGER.MAX_VALUE;
        for(var key in localStorage) {
            if(!localStorage.hasOwnProperty(key)) {
                continue;
            }
            if(!isInt(key)) {
                continue;
            }
            min = Math.min(min, parseInt(key));
        }
        if(min === INTEGER.MAX_VALUE) {
            return 0;
        }
        return min;
    };

    /**
     * @returns {number} The key of the current upload, or 0
     */
    var activeKey = function() {
        var max = 0;
        for(var key in localStorage) {
            if(!localStorage.hasOwnProperty(key)) {
                continue;
            }
            max = Math.max(max, parseInt(key));
        }
        return max;
    };

    /**
     * @returns {number} The key where the next upload should be stored
     */
    var nextKey = function() {
        return activeKey() + 1;
    };

    /**
     * @returns {UploadState|null} The current thing to upload, or null
     */
    var getCurrentUploadState = function() {
        // See if there are things to upload
        var mk = minKey();
        if(mk === 0) {
            return null;
        }

        // Grab the next thing to upload
        var state = new UploadState(mk, localStorage);
        state.load();
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
        return end - state.getPosition();
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
        //console.log('poll() Polling for work...');
        if(uploading) {
            return; // Don't be re-entrant
        }

        // Get the current upload state
        var state = getCurrentUploadState();
        if(state === null) {
            console.log('poll() No uploads left!');
            return; // Nothing to upload, or data still being loaded from disk
        }

        // Grab the next chunk to upload
        var chunk = getNextChunk(state);
        if(chunk === null) {
            console.log('poll() Upload in queue, but still waiting for data to load from disk...');
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
        return new Uint8Array(state.getData(), state.getPosition(), chunkSize);
    };

    var sendNextChunk = function(state) {
        var abv = getNextChunk(state);
        //console.log('sendNextChunk() sending ' + abv.length + ' bytes..');
        //state.startUpload(abv.length); // TODO: Put tracking back in
        var req = createNextRequest(state);
        uploading = true;
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
        console.log('createNextRequest() ' + state.getFilename() + ' ' + contentRange);
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
        uploading = false;
    };

    // -------------------------------------------- Status events -----------------------------------------------------
    var updateProgress = function(ev) {
        // TODO: Fire onProgress?
    };

    var transferComplete = function(ev) {
        //console.log('transferComplete()')

        var state = getCurrentUploadState();
        //state.endUpload(); // TODO: Put tracking back in
        updateStatus();
        if(state !== null) {
            state.setPosition(state.getPosition() + CHUNK_SIZE);
            state.save();
        }
        freeRequest(ev);
    };

    var transferFailed = function(ev) {
        console.log('transferFailed()');
        //var state = getCurrentUploadState();
        //state.endUpload();  // TODO: Put tracking back in
        freeRequest(ev);
    };

    var transferCanceled = function(ev) {
        console.log('transferCanceled()');
        //var state = getCurrentUploadState();
        //state.endUpload();  // TODO: Put tracking back in
        freeRequest(ev);
    };

    var updateStatus = function() {
        var state = getCurrentUploadState();
        try {
            self.onProgress(state);
        } catch (ex) {
            console.log(ex);
        }
    };

    return self;
};