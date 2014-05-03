/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'webdav/File',
    'mock/WebFile'
], function (File, WebFile) {
    describe('File', function () {

        it('should get properties from XML', function () {
            var text = '\
<?xml version="1.0" encoding="UTF-8"?>\
<D:multistatus xmlns:D="DAV:" xmlns:ns0="DAV:">\
	<D:response xmlns:lp1="DAV:" xmlns:lp2="http://apache.org/dav/props/">\
		<D:href>/webdav1/test/</D:href>\
		<D:propstat>\
			<D:prop>\
				<lp1:creationdate>4</lp1:creationdate>\
				<lp1:getlastmodified>5</lp1:getlastmodified>\
				<D:getcontenttype>2</D:getcontenttype>\
				<lp1:getcontentlength>3</lp1:getcontentlength>\
			</D:prop>\
			<D:status>HTTP/1.1 200 OK</D:status>\
		</D:propstat>\
	</D:response>\
</D:multistatus>\
            ';
            var response = $(text);
            var rootPath = '/webdav1/';

            var file = new File(response, rootPath);

            expect(file.getPath()).toEqual('/webdav1/test/');
            expect(file.getRelativePath()).toEqual('test/');
            expect(file.getContentType()).toEqual('2');
            expect(file.getContentLength()).toEqual('3');
            expect(file.getCreationDate()).toEqual('4');
            expect(file.getLastModified()).toEqual('5');
        });

        it('should compare properly', function () {
            var files = [
                new WebFile('z', 'd'),
                new WebFile('z', 'c'),
                new WebFile('a', 'b'),
                null
            ];

            files.sort(File.COMPARATOR);

            expect(files[0]).toBeNull();
            expect(files[1].getContentType()).toEqual('a');
            expect(files[2].getRelativePath()).toEqual('c');
            expect(files[3].getRelativePath()).toEqual('d');
        });

    });
});
