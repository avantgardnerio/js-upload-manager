/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
describe('UploadManager', function() {
    var manager;
    var file;

    beforeEach(function() {

        // Mock FileReader
        var FileReader = function() {
            var self = {};
            var ar = Base64.decode(img64);
            self.readAsArrayBuffer = function() {
                var ev = {
                    'target': {
                        'result': ar
                    }
                };
                self.onload(ev);
            };
            return self;
        };

        // Mock XMLHttpRequest
        var XMLHttpRequest = function() {
            var self = {};

            var listeners = {};

            self.addEventListener = function(type, listener, useCapture) {
                listeners[type] = listener;
            };

            self.open = function(method, url, async) {
            };

            self.setRequestHeader = function(key, value) {
            };

            self.overrideMimeType = function(mimeType) {
            };

            self.send = function(body) {
                var func = listeners['load'];
                func();
            };

            return self;
        };

        manager = new UploadManager(FileReader, XMLHttpRequest);

        // Mock file
        file = {
        };
    });

    it('should be able to upload a file', function() {
        var isDone = false;
        manager.onFileComplete = function() {
            isDone = true;
        };
        manager.enqueue(file);
        manager.upload();
        expect(isDone).toBe(true);
    });

});
