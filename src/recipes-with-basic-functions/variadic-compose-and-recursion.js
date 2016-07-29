'use strict';
(function() {

    var compose = function() {
        var slice = [].slice,
            fns = slice.call(arguments);

        return function(val) {
            return fns.reverse()
                .reduce(
                    function(acc, fn) {
                        return fn(acc);
                    }, val
                );
        };
    };

    var addOne = function(a) {
        return a + 1;
    };

    var addTwo = function(a) {
        return a + 2;
    };

    var logResult = function(res) {
        console.log('your value is: ', res);
    };

    const yourResult = compose(logResult, addTwo, addOne);

    yourResult(1);


}());
