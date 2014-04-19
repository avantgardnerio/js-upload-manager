/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define(function(require, exports, module) {

    var Base64 = require('lib/Base64');

    return function(Image, document) {
        var self = {};

        // Graphics constants
        var TARGET_WIDTH = 800;
        var TARGET_HEIGHT = 600;
        var TARGET_FORMAT = 'image/jpeg';
        var URL_PREFIX = 'data:' + TARGET_FORMAT + ';base64,';
        var TARGET_QUALITY = 0.95;

        self.onLoad = function (data, callback) {
            var b64imgData = Base64.encode(data);
            var img = new Image();
            img.addEventListener('load', function () {
                var canvas = document.createElement('canvas');

                // Calculate new size
                var xRatio = TARGET_WIDTH / this.width;
                var yRatio = TARGET_HEIGHT / this.height;
                var ratio = Math.min(xRatio, yRatio);
                var width = Math.round(this.width * ratio);
                var height = Math.round(this.height * ratio);

                // Resize the canvas
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext('2d');

                // Draw the image
                ctx.drawImage(img,
                    0, 0, this.width, this.height,  // Source coords
                    0, 0, width, height             // dest coords
                );

                // Grab a screenshot
                var url = canvas.toDataURL(TARGET_FORMAT, TARGET_QUALITY);
                b64imgData = url.substr(URL_PREFIX.length);
                var byteArray = Base64.decode(b64imgData);

                // Upload!
                callback(byteArray);
            }, false);
            img.setAttribute('src', URL_PREFIX + b64imgData);
        };

        return self;
    }
});