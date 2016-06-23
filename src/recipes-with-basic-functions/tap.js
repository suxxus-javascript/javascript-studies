'use strict';

(function() {
    // Tap
    // ---------------
    // It takes a value and returns a function that always returns the value, but if you pass it a function,
    // it executes the function for side-effects.
    // https://leanpub.com/javascriptallongesix/read#leanpub-auto-recipes-with-basic-functions

    // Runs the given function with the supplied object, then returns the object. (RAMDA)
    var tap = function(value) {
        return function(fn) {
            var action = (typeof fn === 'function') ? fn : function() {};
            action(value);
            return value;
        };
    };

    console.log('should be \'mocha\': ',

        tap('mocha')(function(val) {
            console.log('my ' + val);
        }) === 'mocha'

    );

}());
