/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
require.config({
    map: {
        '*': {
            'real': 'mock'
        }
    }
});
define([
    'events/ProgressEvent',
    'mock/FileMock',
    'uploads/UploadManager',
    'resource/Resources'
], function (
    ProgressEvent,
    FileMock,
    UploadManager,
    Resources
    ) {
    describe('UploadManager', function() {
        var manager;
        var file1 = new FileMock('test1.jpg', 'image/jpeg', Resources.getImage1());
        var file2 = new FileMock('test2.jpg', 'image/jpeg', Resources.getImage2());

        beforeEach(function() {
            manager = new UploadManager();
            localStorage.clear();
        });

        afterEach(function() {
            localStorage.clear();
        });

        it('should be able to upload files', function() {
            var count = 0;
            manager.addEventListener(ProgressEvent.TYPE, function(ev) {
                count++;
            });

            manager.enqueue(file1);
            manager.enqueue(file2);

            manager.upload();
            expect(count).toBe(32); // currently the test files are 32 blocks long
        });

    });
});
