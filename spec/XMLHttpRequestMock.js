var XMLHttpRequestMock = function() {
    var self = {};

    var listeners = {};

    self.addEventListener = function(type, listener, useCapture) {
        var ar = listeners[type];
        if(ar === undefined) {
            ar = [];
        }
        ar.push(listener);
        listeners[type] = ar;
    };

    self.removeEventListener = function(type, listener) {
        var ar = listeners[type];
        if(ar === undefined) {
            ar = [];
        }
        var index;
        while(index = ar.indexOf(listener) >= 0) {
            ar = ar.splice(index, 1);
        }
        if(ar.length > 0) {
            listeners[type] = ar;
        } else {
            delete listeners[type];
        }
    };

    self.open = function(method, url, async) {
    };

    self.setRequestHeader = function(key, value) {
    };

    self.overrideMimeType = function(mimeType) {
    };

    self.send = function(body) {
        var ar = listeners['load'];
        if(ar === undefined) {
            return;
        }
        var ev = {
            'target': self
        };
        for(var i = 0; i < ar.length; i++) {
            var func = ar[i];
            func(ev);
        }
    };

    return self;
};
