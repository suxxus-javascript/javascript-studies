'use strict';

(function() {
    // compose
    var compose = function(a, b) {
        return function(c) {
            return a(b(c));
        };
    };

    var addOne = function(num) {
        return num + 1;
    };

    var doubleOf = function(num) {
        return num * 2;
    };

    var doubleOfAddOne = function(num) {
        return addOne(doubleOf(num));
    };

    var doubleOfAddOneUsingCompose = compose(addOne, doubleOf);

    console.log('addOne(3) should be 4: ', addOne(3) === 4);
    console.log('doubleOf(2) should be 4: ', doubleOf(2) === 4);
    console.log('doubleOfAddOne(2) should be 5: ', doubleOfAddOne(2) === 5);
    console.log('doubleOfAddOneUsingCompose(1) should be 5: ', doubleOfAddOneUsingCompose(2) === 5);
}());
