var FileMock = function(name, type, data) {
    var self = {};

    self.name = name;
    self.type = type;

    self.getName = function() {
        return name;
    };

    self.getType = function() {
        return type;
    };

    self.getData = function() {
        return data;
    };

    return self;
};