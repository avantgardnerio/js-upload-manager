/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
/**
 * A wrapper for the WebDAV response objects representing files or directories on the server
 */
define(function(require, exports, module) {

    /**
     * Create sane namings for otherwise incomprehensible WebDAV fields
     */
    var NAME_MAP = {
        href: 'D\\:href',
        contentType: 'D\\:getcontenttype',
        contentLength: 'lp1\\:getcontentlength',
        creationDate: 'lp1\\:creationdate',
        lastModified: 'lp1\\:getlastmodified'
    };

    var TYPE = {
        DIRECTORY: 'httpd/unix-directory'
    };

    var COMPARATOR = function(left, right) {
        if(!left && !right) {
            return 0;
        }
        if(!left) {
            return -1;
        }
        if(!right) {
            return 1;
        }
        var leftType = left.getContentType();
        var rightType = right.getContentType();
        if(leftType < rightType) {
            return -1;
        }
        if(leftType > rightType) {
            return 1;
        }
        var leftPath = left.getRelativePath();
        var rightPath = right.getRelativePath();
        if(leftPath < rightPath) {
            return -1;
        }
        if(leftPath > rightPath) {
            return 1;
        }
        return 0;
    };

    var File = function(response, rootPath) {

        var self = {};

        // ----------------------------------------- Private members --------------------------------------------------
        var props;

        // ------------------------------------------- Constructor ----------------------------------------------------
        var ctor = function() {
            var propstat = $(response).children('D\\:propstat')[0];
            props = $(propstat).children('D\\:prop');
        };

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.getPath = function() {
            return self.getProp('href');
        };

        self.getRelativePath = function() {
            var path = self.getPath();
            return path.substr(rootPath.length);
        };

        self.getContentType = function() {
            return self.getProp('contentType');
        };

        self.getContentLength = function() {
            return self.getProp('contentLength');
        };

        self.getCreationDate = function() {
            return self.getProp('creationDate');
        };

        self.getLastModified = function() {
            return self.getProp('lastModified');
        };

        self.getProp = function(key) {
            var root = props;
            if(key === 'href') {
                root = response;
            }
            return getText(root, key);
        };

        // ----------------------------------------- Private methods --------------------------------------------------
        var getText = function(props, name) {
            var key = NAME_MAP[name];
            var val = $(props).children(key);
            if(!val) {
                return '';
            }
            val = val[0];
            if(!val) {
                return '';
            }
            return $(val).text();
        };

        ctor();

        return self;
    };

    File.COMPARATOR = COMPARATOR;
    File.TYPE = TYPE;

    return File;
});
