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

    var ProgressEvent = require('events/ProgressEvent');
    var SelectionEvent = require('events/SelectionEvent');

    var ResizeFilter = require('filters/ResizeFilter');

    var FileRenderer = require('renderers/FileRenderer');

    var UploadManager = require('uploads/UploadManager');

    var WebDavClient = require('webdav/WebDavClient');

    var CreateFolder = require('widgets/CreateFolder');
    var DataGrid = require('widgets/DataGrid');
    var ProgressBar = require('widgets/ProgressBar');
    var UploadStats = require('widgets/UploadStats');

    var WebDavBrowser = function(rootPath) {

        var self = {};

        // ----------------------------------------- Private members --------------------------------------------------
        var columnNames = ['href','contentType','contentLength','creationDate','lastModified'];
        var client = new WebDavClient(rootPath);
        var fileRenderer = new FileRenderer(columnNames);
        var grid = new DataGrid(columnNames);
        var createFolder = new CreateFolder();
        var manager = new UploadManager(rootPath);
        var stats = new UploadStats();
        var pbMain = new ProgressBar();

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

        var onDelete = function() {
            var items = grid.getSelectedItems();
            for(var i = 0; i < items.length; i++) {
                var item = items[i];
                client.delete(item);
            }
        };

        var onFileSelect = function(ev) {
            var files = ev.target.files;
            for(var i = 0; i < files.length; i++) {
                var file = files[i];
                manager.enqueue(file);
            }
            manager.setPath(client.getCurrentPath());
            manager.upload();
        };

        var onProgress = function(ev) {
            var state = ev.getStatus();
            var percent = state ? state.getPercent() : 0;
            pbMain.setPercent(percent);
            stats.setState(state);

            if(!state) {
                client.update(); // File was completed
            }
        };

        var onSelect = function(ev) {
            var item = ev.getItem();
            if (item.getContentType() !== 'httpd/unix-directory') {
                return;
            }
            client.navigate(item.getRelativePath());
        };

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
            el.append(popupHolder);
            el.append(fileHolder);

            popupHolder.append(createFolder.getElement());

            createFolder.addEventListener('create', onCreate);

            fileRenderer.setPath(client.getCurrentPath());

            manager.addFilter(new ResizeFilter(Image, document));
            manager.addEventListener(ProgressEvent.TYPE, onProgress);
            manager.upload(); // Kick off any prior uploads

            grid.setRenderer(fileRenderer);
            grid.setDataSource(client.getFiles());
            grid.addEventListener(SelectionEvent.TYPE, onSelect);

            fileHolder.load('templates/WebDavBrowser.html', function() {
                // Elements owned by this widget
                fileHolder.find('.newFolder').click(showPopup);
                fileHolder.find('.btnDelete').click(onDelete);
                fileHolder.find('.fileSelect').change(onFileSelect);

                // Child widgets
                fileHolder.find('.fileList').append(grid.getElement());
                fileHolder.find('.usMain').append(stats.getElement());
                fileHolder.find('.pbMain').append(pbMain.getElement());
            });
        };

        ctor();

        return self;
    };

    return WebDavBrowser;
});