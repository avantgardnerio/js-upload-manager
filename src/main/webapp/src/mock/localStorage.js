/**
 * PhantomJS does not support localStorage yet, so we have to mock it
 */
define(function(require, exports, module) {
    var localStorage = function() {
    };

    localStorage.setItem = function(key, item) {
        if(typeof item !== 'string') {
            item = item.toString();
        }
        localStorage[key] = item;
    };

    localStorage.getItem = function(key) {
        var val = localStorage[key];
        if(val === undefined) {
            return null; // be compatible with real localStorage
        }
        return val;
    };

    localStorage.removeItem = function(key) {
        delete localStorage[key];
    };

    localStorage.hasOwnProperty = function(key) {
        return typeof localStorage[key] !== 'function';
    };

    localStorage.clear = function() {
        for(var key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            delete localStorage[key];
        }
    };

    return localStorage;
});
