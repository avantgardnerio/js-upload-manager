var RingBuffer = function(size) {
    var self = {};

    var ar = [];
    var position = 0;

    self.add = function(item) {
        ar[position] = item;
        position = (position + 1) % size;
        console.log("position=" + position + " size=" + ar.length);
    }

    self.average = function() {
        var count = 0;
        for(var i = 0; i < ar.length; i++) {
            var item = ar[i];
            count += item;
        }
        return Math.round(count / ar.length);
    }

    return self;
}