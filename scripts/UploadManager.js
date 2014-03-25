/*
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
var UploadManager = function() {
    var self = {};

    // Constants
    var CHUNK_SIZE = 20 * 1024;
    var POLL_INTERVAL = 250;

    var state = new UploadState();

    /**
     * Uploads a file to the server
     *
     * @param file The file to upload
     */
    self.upload = function(file) {
        // Save meta data
        state.setFilename(file.name);
        state.setMimeType(file.type);
        state.setPosition(0);

        // Read the file from the disk
        var reader = new FileReader();
        reader.onload = function(ev) {
            state.setData(ev.target.result);
        };
        reader.readAsArrayBuffer(file);
    };

    // -------------------------------------------- Helper methods ----------------------------------------------------
    var uploadChunk = function() {
        // Read from local storage
        if(state.getData() === null) {
            return; // Nothing to upload!
        }

        // Calculate next chunk
        var end = Math.min(state.getPosition() + CHUNK_SIZE, state.getLength());
        var chunkSize = end - state.getPosition();
        if(chunkSize <= 0) {
            state.clear();
            console.log("Transfer complete!"); // TODO: Fire event
            updateStatus();
            return;
        }
        //console.log("Sending " + chunkSize + " bytes " + state.getPosition() + " of " + state.getLength());
        var abv = new Uint8Array(state.getData(), state.getPosition(), chunkSize);

        // Build content-range
        var contentRange = "bytes " + state.getPosition() + "-" + (end-1) + "/" + state.getLength();

        // Send
        state.startUpload(chunkSize);
        var req = new XMLHttpRequest();

        // Add listeners
        req.addEventListener("progress", updateProgress, false);
        req.addEventListener("load", transferComplete, false);
        req.addEventListener("error", transferFailed, false);
        req.addEventListener("abort", transferCanceled, false);

        // Create request
        req.open("POST", 'upload.php', true); // TODO: Use webdav on server, put filename here?

        // Set headers
        req.setRequestHeader('HTTP_X_FILENAME', state.getFilename()); // TODO: Use webdav and remove this line?
        req.setRequestHeader('Content-Range', contentRange);
        req.overrideMimeType(state.getMimeType());

        // Send
        req.send(abv);
    };

    // -------------------------------------------- Status events -----------------------------------------------------
    var updateProgress = function(ev) {
        //console.log("updateProgress() type=" + ev.type + " loaded=" + ev.loaded + " position=" + ev.position);
        // TODO: Fire onProgress?
    };

    var transferComplete = function(ev) {
        //console.log("transferComplete() type=" + ev.type + " loaded=" + ev.loaded + " position=" + ev.position);
        state.endUpload();
        updateStatus();
        state.setPosition(state.getPosition() + CHUNK_SIZE);
    };

    var updateStatus = function() {
        if(!self.onProgress) {
            return;
        }
        self.onProgress(state);
    };

    var transferFailed = function(ev) {
        state.endUpload();
        console.log(ev);
    };

    var transferCanceled = function(ev) {
        state.endUpload();
        console.log(ev);
    };

    // Every 0.5 seconds, poll to see if there is stuff to upload
    setInterval(uploadChunk, POLL_INTERVAL);

    return self;
};
