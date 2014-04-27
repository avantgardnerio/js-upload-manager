/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define(function(require, exports, module) {

    var FileReaderMock = function() {
        var self = {};
        self.readAsArrayBuffer = function (file) {
            var ev = {
                'target': {
                    'result': file.getData()
                }
            };
            self.onload(ev);
        };
        return self;
    };

    return FileReaderMock;
});
