/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
describe('UploadManager', function() {
    var manager;
    var file1 = new FileMock('test1.jpg', 'image/jpeg', Resources.getImage1());
    var file2 = new FileMock('test2.jpg', 'image/jpeg', Resources.getImage2());
    var localStorage = new LocalStorageMock();

    beforeEach(function() {
        manager = new UploadManager(FileReaderMock, XMLHttpRequestMock, new TimerMock(), localStorage);
        localStorage.clear();
    });

    afterEach(function() {
        localStorage.clear();
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
