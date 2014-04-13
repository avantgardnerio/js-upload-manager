var FileReaderMock = function() {
    var self = {};
    self.readAsArrayBuffer = function(file) {
        var ev = {
            'target': {
                'result': file.getData()
            }
        };
        self.onload(ev);
    };
    return self;
};
