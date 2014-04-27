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
    var File = require('webdav/File');

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

        // TODO: Better OO (return files - don't change state)
        var readXml = function(xml) {
            var files = new List();

            // Translate the XML into File objects
            for(var statusIndex = 0; statusIndex < xml.children.length; statusIndex++) {
                var status = xml.children[statusIndex];
                for(var responseIndex = 0; responseIndex < status.children.length; responseIndex++) {
                    var response = status.children[responseIndex];
                    var file = new File(response, rootPath);
                    if(file.getContentType() === File.TYPE.DIRECTORY) {
                        folders[file.getPath()] = file;
                    }
                    files.addItem(file);
                }
            }

            // Artificially add the parent folder
            var parentPath = getParentPath(self.getCurrentPath());
            var parentFolder = folders[parentPath];
            if(parentFolder) {
                files.addItem(parentFolder);
            }

            // Sort
            files.sort(File.COMPARATOR);

            return files;
        };

        // TODO: Utility class
        var getParentPath = function(path) {
            // Take off trailing slash
            if(endsWith(path, '/')) {
                path = path.substring(0, path.length-1);
            }

            // Truncate to last slash before it
            var index = path.lastIndexOf('/');
            path = path.substring(0, index);

            // Add a slash turning it back into a directory
            path += '/';
            return path;
        };

        // TODO: Utility class
        var endsWith = function(text, suffix) {
            return text.indexOf(suffix, text.length - suffix.length) !== -1;
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