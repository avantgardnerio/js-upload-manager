/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A WebDAV folder browser
 */
define(function(require, exports, module) {

    var WebDavClient = require('webdav/WebDavClient');
    var DataGrid = require('widgets/DataGrid');

    return function() {

        var self = {};

        var el = $('<div/>');
        var popupHolder = $('<div/>');
        el.append(popupHolder);
        var fileHolder = $('<div/>');
        el.append(fileHolder);

        self.getElement = function() {
            return el;
        };

        var showPopup = function() {
            popupHolder.load('templates/CreateFolder.html');
        };

        var ctor = function() {
            fileHolder.load('templates/WebDavBrowser.html', function() {
                var client = new WebDavClient('/webdav1/');
                var grid = new DataGrid(['href','contentType','contentLength','creationDate','lastModified']);
                grid.setDataSource(client.getFiles());
                fileHolder.find('.fileList').append(grid.getElement());
                fileHolder.find('.newFolder').click(showPopup);
            });
        };

        ctor();

        return self;
    }
});