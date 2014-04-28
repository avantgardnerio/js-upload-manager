/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'webdav/File'
], function (File) {
    describe('File', function () {

        var MAP = {
            getcontenttype: '2',
            getcontentlength: '3',
            creationdate: '4',
            getlastmodified: '5'
        };

        it('should get properties from XML', function () {
            var response = {
                getElementsByTagName: function(prop) {
                    if(prop === 'href') {
                        return [{innerHTML: '/webdav1/test/'}];
                    }
                    if(prop === 'prop') {
                        return [{
                            getElementsByTagName: function(prop) {
                                return [{innerHTML: MAP[prop]}];
                            }
                        }];
                    }
                }
            };
            var rootPath = '/webdav1/';

            var file = new File(response, rootPath);

            expect(file.getPath()).toEqual('/webdav1/test/');
            expect(file.getRelativePath()).toEqual('test/');
            expect(file.getContentType()).toEqual('2');
            expect(file.getContentLength()).toEqual('3');
            expect(file.getCreationDate()).toEqual('4');
            expect(file.getLastModified()).toEqual('5');
        });

    });
});
