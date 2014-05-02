/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'webdav/WebDavClient',
    'mock/jquery'

], function (
    WebDavClient,
    $
    ) {
    describe('WebDavClient', function () {

        beforeEach(function () {
        });

        it('should be instantiable', function () {
            var xml = {
                children: [
                    {
                        children: [
                            {
                                getElementsByTagName: function (key) {
                                    return [
                                        {
                                            getElementsByTagName: function (key) {
                                                return {
                                                    getcontenttype: 'httpd/unix-directory'
                                                }[key];
                                            }
                                        }
                                    ];
                                }
                            }
                        ]
                    }
                ]
            };
            $.setResponse(xml);

            var c = new WebDavClient();
            expect(c).toBeDefined();
        });

        it('should be able to delete files', function () {
            var xml = {
                children: [
                ]
            };
            $.setResponse(xml);

            var client = new WebDavClient();

            xml = {};
            $.setResponse(xml);
            spyOn($, 'ajax');

            client.delete({
                getPath: function() {
                    return 'test.png';
                }
            });

            expect($.ajax).toHaveBeenCalled();
        });

    });
});
