require([
    'uploads/UploadManager',
    'filters/ResizeFilter'
], function(
    UploadManager,
    ResizeFilter
    ) {

    window.exports = window.exports || {};

    var manager = new UploadManager();
    manager.addFilter(new ResizeFilter(Image, document));
    manager.upload(); // Kick off any prior uploads

    manager.onProgress = function(state) {
        // TODO: jQuery
        if(state !== null) {
            document.getElementById("pbMain").style.width = state.getPercentText();
            document.getElementById("tdFilename").innerHTML = state.getFilename();
            document.getElementById("tdMimeType").innerHTML = state.getMimeType();
            document.getElementById("tdPosition").innerHTML = state.getPosition();
            document.getElementById("tdLength").innerHTML = state.getLength();
            document.getElementById("tdBandwidth").innerHTML = manager.getKbps();
        } else {
            document.getElementById("pbMain").style.width = '0%';
            //document.getElementById("tdFilename").innerHTML = '';
            //document.getElementById("tdMimeType").innerHTML = '';
            //document.getElementById("tdPosition").innerHTML = '';
            document.getElementById("tdLength").innerHTML = '';
            //document.getElementById("tdBandwidth").innerHTML = '';
        }
    };

    var fuMain = document.getElementById('fuMain');
    if(fuMain) {
        fuMain.addEventListener('change', function(ev) {
            var files = ev.target.files;
            for(var i = 0; i < files.length; i++) {
                var file = files[i];
                manager.enqueue(file);
            }
            manager.upload();
        });
    }
});
