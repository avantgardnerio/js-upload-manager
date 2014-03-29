var UploadManager = function() {
    var self = {};

    // Upload constants
    var CHUNK_SIZE = 20 * 1024;     // Set as needed according to bandwidth & latency
    var POLL_INTERVAL = 10;        // 250 for testing, lower for faster transfers

    // Graphics constants
    var TARGET_WIDTH = 800;
    var TARGET_HEIGHT = 600;
    var TARGET_FORMAT = 'image/jpeg';
    var URL_PREFIX = 'data:' + TARGET_FORMAT + ';base64,';
    var TARGET_QUALITY = 0.95;

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
            var b64imgData = exports.encode(ev.target.result);
            var img = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');

                // Calculate new size
                var xRatio = TARGET_WIDTH / this.width;
                var yRatio = TARGET_HEIGHT / this.height;
                var ratio = Math.min(xRatio, yRatio);
                var width = Math.round(this.width * ratio);
                var height = Math.round(this.height * ratio);

                // Resize the canvas
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");

                // Draw the image
                ctx.drawImage(img,
                    0, 0, this.width, this.height,  // Source coords
                    0, 0, width, height             // dest coords
                );

                // Grab a screenshot
                var url = canvas.toDataURL(TARGET_FORMAT, TARGET_QUALITY);
                b64imgData = url.substr(URL_PREFIX.length);
                var byteArray = exports.decode(b64imgData);

                // Upload!
                state.setData(byteArray)
            };
            img.src = URL_PREFIX + b64imgData;
        };
        reader.readAsArrayBuffer(file);
    };

    // -------------------------------------------- Helper methods ----------------------------------------------------
    var uploadChunk = function() {
        // Read from local storage
        if(state.getData() === null) {
            return; // Nothing to upload!
        }
        if(state.isUploading()) {
            return; // Already uploading a chunk, don't be reentrant
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