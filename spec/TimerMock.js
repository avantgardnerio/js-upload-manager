var TimerMock = function(timeout) {
    var self = {};

    timeout = timeout || 10000; // Ten second default timeout

    var running = true;

    /**
     * Mock timer that will synchronously call the callback until clearInterval is called
     * @param callback The call back to call
     * @param interval An interval with which to call back
     * @returns {{}}
     */
    self.setInterval = function(callback, interval) {
        var start = now();
        while(running && now() - start < timeout) {
            var ev = {};
            callback(ev);
            sleep(interval);
        }
        return {};
    };

    /**
     * Stops the current timer
     * @param token Ignored parameter for compatibility with the standard API
     */
    self.clearInterval = function(token) {
        running = false;
    };

    /**
     * @returns {number} The current time in millis
     */
    var now = function() {
        return new Date().getTime();
    };

    /**
     * Busy-wait until the given duration expires
     * @param duration The duration to wait
     */
    var sleep = function(duration) {
        var start = now();
        while(now() - start < duration) {
            // Burn CPU cycles
        }
    };

    return self;
};