/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A WebDAV protocol compatible client
 */
define(function(require, exports, module) {

    var List = require('collections/List');

    var ArrayUtil = require('utils/ArrayUtil');

    var File = require('webdav/File');

    var PathUtil = require('utils/PathUtil');

    var $ = require('real/jquery');

    var WebDavClient = function(rootPath) {

        var self = {};

        // ----------------------------------------- Private members --------------------------------------------------
        var path = '';
        var folders = {};
        var files = new List();

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.getCurrentPath = function() {
            return rootPath + path;
        };

        self.getCurrentFile = function() {
            return currentFile;
        };

        self.getFiles = function() {
            return files;
        };

        self.navigate = function(url) {
            path = url;
            self.update();
        };

        self.createFolder = function(filename) {
            $.ajax({
                type: 'MKCOL',
                url: self.getCurrentPath() + filename,
                success: function() {
                    self.update();
                }
                // TODO: Handle failure
            });
        };

        self.delete = function(file) {
            $.ajax({
                type: 'DELETE',
                url: file.getPath(),
                success: function() {
                    self.update();
                }
                // TODO: Handle failure
            });
        };

        self.update = function() {
            var propsBody = document.implementation.createDocument('DAV:', 'propfind', null);
            propsBody.documentElement.appendChild(propsBody.createElementNS('DAV:', 'allprop'));
            var serializer = new XMLSerializer();
            var str = '<?xml version="1.0" encoding="utf-8" ?>' + serializer.serializeToString(propsBody);

            $.ajax({
                type: 'PROPFIND',
                url: self.getCurrentPath(),
                data: str,
                dataType: 'xml',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Depth', '1');
                    xhr.setRequestHeader('Content-Type', 'application/xml');
                },
                success: function(xml) {
                    var newFiles = readXml(xml);
                    files.copy(newFiles);
                }
                // TODO: Handle failure
            });
        };

        // ----------------------------------------- Private methods --------------------------------------------------

        var readXml = function(xml) {
            var files = new List();

            // Translate the XML into File objects
            $(xml.documentElement).children('D\\:response').each(function(index, response) {
                var file = new File(response, rootPath);
                if(file.getContentType() === File.TYPE.DIRECTORY) {
                    folders[file.getPath()] = file;
                }
                files.addItem(file);
            });

            // Artificially add the parent folder
            var parentPath = PathUtil.getParentPath(self.getCurrentPath());
            var parentFolder = folders[parentPath];
            if(parentFolder) {
                files.addItem(parentFolder);
            }

            // Sort
            files.sort(File.COMPARATOR);

            return files;
        };

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
            self.update();
        };

        ctor();

        return self;
    };

    return WebDavClient;
});