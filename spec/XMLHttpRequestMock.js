var XMLHttpRequestMock = function() {
    var self = {};

    var listeners = {};

    self.addEventListener = function(type, listener, useCapture) {
        listeners[type] = listener;
    };

    self.open = function(method, url, async) {
    };

    self.setRequestHeader = function(key, value) {
    };

    self.overrideMimeType = function(mimeType) {
    };

    self.send = function(body) {
        var func = listeners['load'];
        func();
    };

    return self;
};
