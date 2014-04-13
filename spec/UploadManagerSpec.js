/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
describe('UploadManager', function() {
    var manager;
    var file1;
    var file2;

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

        manager = new UploadManager(FileReader, XMLHttpRequest, localStorage);

        // Mock files
        file1 = {
        };
        file2 = {
        };

        localStorage.clear();
    });

    afterEach(function() {
        localStorage.clear();
    });

    it('should be able to find the next key in local storage', function() {
        expect(manager.nextKey()).toEqual(1);

        localStorage.clear();
        localStorage.setItem(1, 'test1');
        expect(manager.nextKey()).toEqual(2);
    });

    it('should be able to upload files', function() {
        var isDone = false;
        manager.onFileComplete = function() {
            isDone = true;
        };

        manager.enqueue(file1);
        manager.enqueue(file2);

        manager.upload();
        expect(isDone).toBe(true);
    });

});
