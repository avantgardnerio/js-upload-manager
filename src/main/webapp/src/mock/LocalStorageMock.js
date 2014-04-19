define(function(require, exports, module) {
    var LocalStorageMock = function() {
    };

    LocalStorageMock.prototype.setItem = function(key, item) {
        this[key] = item;
    };

    LocalStorageMock.prototype.getItem = function(key) {
        var val = this[key];
        if(val === undefined) {
            return null; // be compatible with real localStorage
        }
        return val;
    };

    LocalStorageMock.prototype.removeItem = function(key) {
        delete this[key];
    };

    LocalStorageMock.prototype.clear = function() {
        for(var key in this) {
            if(!this.hasOwnProperty(key)) {
                continue;
            }
            delete this[key];
        }
    };

    return LocalStorageMock;
});

