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
    var CreateFolder = require('widgets/CreateFolder');

    var WebDavBrowser = function() {

        var self = {};

        // ----------------------------------------- Private members --------------------------------------------------
        var client = new WebDavClient('/webdav1/');
        var grid = new DataGrid(['href','contentType','contentLength','creationDate','lastModified']);
        var createFolder = new CreateFolder();
        var el = $('<div/>');
        var popupHolder = $('<div/>');
        var fileHolder = $('<div/>');

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.getElement = function() {
            return el;
        };

        // ----------------------------------------- Private methods --------------------------------------------------
        var onCreate = function() {
            var filename = createFolder.getText();
            client.createFolder(filename);
        };

        var showPopup = function() {
            createFolder.show();
        };

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
            el.append(popupHolder);
            el.append(fileHolder);

            popupHolder.append(createFolder.getElement());

            createFolder.addEventListener('create', onCreate);

            grid.setDataSource(client.getFiles());

            fileHolder.load('templates/WebDavBrowser.html', function() {
                fileHolder.find('.fileList').append(grid.getElement());
                fileHolder.find('.newFolder').click(showPopup);
            });
        };

        ctor();

        return self;
    };

    return WebDavBrowser;
});