/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
var UploadState = function(key) {
    var self = {};

    var data = null;

    // Load
    var state = {
        'filename': null,
        'mimeType': 'application/octet-stream',
        'position': 0,
        'data': null
    };

    self.load = function() {
        var json = localStorage.getItem(key);
        state = JSON.parse(json);
        data = Base64.decode(state.data);
    };

    self.save = function() {
        var json = JSON.stringify(state);
        localStorage.setItem(key, json);
    };

    self.free = function() {
        data = null;
        localStorage.removeItem(key);
    };

    // ---------------------------------------------------- Data ------------------------------------------------------

    self.setData = function(value) {
        data = value;
        state.data = Base64.encode(data);
    };

    self.getData = function() {
        return data;
    };

    self.getLength = function() {
        var data = self.getData();
        if(data === null) {
            return 0;
        }
        return data.byteLength;
    };

    // ------------------------------------------- Persistent state ---------------------------------------------------
    self.setPosition = function(value) {
        state.position = parseInt(value);
    };

    self.getPosition = function() {
        return state.position;
    };

    self.setFilename = function(value) {
        state.filename = value;
    };

    self.getFilename = function() {
        return state.filename;
    };

    self.setMimeType = function(value) {
        state.mimeType = value;
    };

    self.getMimeType = function() {
        return state.mimeType;
    };

    // ----------------------------------------------- Calculations ---------------------------------------------------

    self.getRatio = function() {
        if(self.getLength() === 0) {
            return 0;
        }
        return self.getPosition() / self.getLength();
    };

    self.getPercent = function() {
        return self.getRatio() * 100;
    };

    self.getPercentText = function() {
        return self.getPercent() + "%";
    };

    return self;
};