/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
var XMLHttpRequestMock = function() {

    var self = new EventDispatcher();

    self.open = function(method, url, async) {
    };

    self.setRequestHeader = function(key, value) {
    };

    self.overrideMimeType = function(mimeType) {
    };

    self.send = function(body) {
        var ev = new Event('load');
        ev.target = self;
        self.status = 200;
        self.dispatch(ev);
    };

    return self;
};
