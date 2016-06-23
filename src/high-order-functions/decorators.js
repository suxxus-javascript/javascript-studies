'use strict';

(function() {
    // decorators
    // decorators aren’t strict about being pure

    var foo = function(x) {
        return x + 1;
    };

    var decoratorFoo = function(fn) {
        return function(x) {
            return (-fn(x) + 1);
        };
    };

    console.log('decoratorFoo(foo)(1) should be -1: ', decoratorFoo(foo)(1) === -1);
}());
