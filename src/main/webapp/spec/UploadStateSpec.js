/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
describe('UploadState', function() {

    var MIME_TYPE = 'application/octet-stream';

    var FILE_1 = Resources.getImage1();
    var FILE_1_SIZE = 264273;
    var KEY = '1';

    beforeEach(function() {
    });

    it('should be instantiable', function() {
        var state = new UploadState(KEY);
        expect(state.getFilename()).toBeNull();
        expect(state.getMimeType()).toBe(MIME_TYPE);
        expect(state.getPosition()).toBe(0);
        expect(state.getData()).toBeNull();
    });

    it('should be recoverable', function() {
        var oldState = new UploadState(KEY);
        oldState.setPosition(100);
        oldState.setFilename('foo');
        oldState.setMimeType('bar');
        oldState.setData(FILE_1);
        oldState.save();

        var newState = new UploadState(KEY);
        newState.load();
        expect(newState.getPosition()).toBe(100);
        expect(newState.getFilename()).toBe('foo');
        expect(newState.getMimeType()).toBe('bar');
        expect(newState.getLength()).toBe(FILE_1_SIZE);
    });

    it('can be deleted', function() {
        var state = new UploadState(KEY);
        state.setPosition(100);
        state.setFilename('foo');
        state.setMimeType('bar');
        state.setData(FILE_1);
        state.save();

        expect(localStorage.getItem(KEY)).toBeDefined();
        state.free();
        expect(localStorage.getItem(KEY)).toBeNull();
    });

});
