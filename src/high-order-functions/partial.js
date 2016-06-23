'use strict';

(function() {
    // partial application
    // When a function takes multiple arguments,
    // we “apply” the function to the arguments

    var mapWith = function(fn) {
        return function(array) {
            return array.map(fn);
        };
    };

    var squareAll = mapWith(function(n) {
        return n * n;
    });

    console.log('squareAll([1, 2, 4]) should be: [1, 4, 16]: ', squareAll([1, 2, 4])[2] === 16);
}());
