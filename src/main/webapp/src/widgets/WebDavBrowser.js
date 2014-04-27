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

        self.getElement = function() {
            return el;
        };

        var ctor = function() {
            el.load('templates/WebDavBrowser.html', function() {
                var client = new WebDavClient('/webdav1/');
                var grid = new DataGrid(['href','contentType','contentLength','creationDate','lastModified']);
                grid.setDataSource(client.getFiles());
                $('.fileList').append(grid.getElement());
            });
        };

        ctor();

        return self;
    }
});