/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
var UploadManager = function(FileReader, XMLHttpRequest) {
    var self = {};

    // Upload constants
    var CHUNK_SIZE = 20 * 1024;     // Set as needed according to bandwidth & latency

    var state = new UploadState();

    /**
     * Uploads a file to the server
     *
     * @param file The file to upload
     */
    self.enqueue = function(file) {
        // Save meta data
        state.setFilename(file.name);
        state.setMimeType(file.type);
        state.setPosition(0);

        // Read the file from the disk
        var reader = new FileReader();
        reader.onload = function(ev) {
            var data = ev.target.result;
            state.setData(data);
            uploadChunk();
        };
        reader.readAsArrayBuffer(file);
    };

    self.onProgress = function() {
    };

    self.onFileComplete = function() {
    };

    // -------------------------------------------- Helper methods ----------------------------------------------------
    var uploadChunk = function() {
        // Calculate next chunk
        var end = Math.min(state.getPosition() + CHUNK_SIZE, state.getLength());
        var chunkSize = end - state.getPosition();
        if(chunkSize <= 0) {
            state.clear();
            console.log('Transfer complete!'); // TODO: Fire event
            updateStatus();
            self.onFileComplete();
            return;
        }
        //console.log('Sending ' + chunkSize + ' bytes ' + state.getPosition() + ' of ' + state.getLength());
        var abv = new Uint8Array(state.getData(), state.getPosition(), chunkSize);

        // Build content-range
        var contentRange = 'bytes ' + state.getPosition() + '-' + (end-1) + '/' + state.getLength();

        // Send
        state.startUpload(chunkSize);
        var req = new XMLHttpRequest();

        // Add listeners
        req.addEventListener('progress', updateProgress, false);
        req.addEventListener('load', transferComplete, false);
        req.addEventListener('error', transferFailed, false);
        req.addEventListener('abort', transferCanceled, false);

        // Create request
        req.open('POST', 'upload.php', true); // TODO: Use webdav on server, put filename here?

        // Set headers
        req.setRequestHeader('HTTP_X_FILENAME', state.getFilename()); // TODO: Use webdav and remove this line?
        req.setRequestHeader('Content-Range', contentRange);
        req.overrideMimeType(state.getMimeType());

        // Send
        req.send(abv);
    };

    // -------------------------------------------- Status events -----------------------------------------------------
    var updateProgress = function(ev) {
        //console.log('updateProgress() type=' + ev.type + ' loaded=' + ev.loaded + ' position=' + ev.position);
        // TODO: Fire onProgress?
    };

    var transferComplete = function(ev) {
        //console.log('transferComplete() type=' + ev.type + ' loaded=' + ev.loaded + ' position=' + ev.position);
        state.endUpload();
        updateStatus();
        state.setPosition(state.getPosition() + CHUNK_SIZE);
        uploadChunk();
    };

    var transferFailed = function(ev) {
        state.endUpload();
        console.log(ev);
        uploadChunk();
    };

    var transferCanceled = function(ev) {
        state.endUpload();
        console.log(ev);
    };

    var updateStatus = function() {
        self.onProgress(state);
    };

    return self;
};