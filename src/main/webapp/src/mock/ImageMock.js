var ImageMock = function() {
    var self = {};

    var events = {};

    self.addEventListener = function(key, callback) {
        var callbacks = events[key];
        if(callbacks === undefined) {
            callbacks = [];
        }
        callbacks.push(callback);
        events[key] = callbacks;
    };

    self.setAttribute = function(key, data) {
        if(key === 'src') {
            var callbacks = events['load'];
            for(var i = 0; i < callbacks.length; i++) {
                var callback = callbacks[i];
                callback(data);
            }
        }
    };

    return self;
};