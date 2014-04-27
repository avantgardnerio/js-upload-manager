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
        href: 'href',
        contentType: 'getcontenttype',
        contentLength: 'getcontentlength',
        creationDate: 'creationdate',
        lastModified: 'getlastmodified'
    };

    var File = function(response) {

        var self = {};

        // ----------------------------------------- Private members --------------------------------------------------
        var props = response.getElementsByTagName('prop')[0];

        // ----------------------------------------- Public methods ---------------------------------------------------
        self.getPath = function() {
            return self.getProp('href');
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
            var val = props.getElementsByTagName(key);
            if(!val) {
                return '';
            }
            val = val[0];
            if(!val) {
                return '';
            }
            return val.innerHTML;
        };

        return self;
    };

    return File;
});