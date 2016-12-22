'use strict';

(function() {
    // Tap
    // ---------------
    // It takes a value and returns a function that always returns the value,
    // but if you pass it a function,
    // it executes the function for side-effects.
    // https://leanpub.com/javascriptallongesix/read#leanpub-auto-recipes-with-basic-functions

    var tap = function(value) {
        return function(fn) {
            var action = (typeof fn === 'function') ? fn : function() {};
            action(value);
            return value;
        };
    };

    console.log('should return \'mocha\': ',

        tap('mocha')(function(val) {
            console.log('executes fn --->  ' + val);
        }) === 'mocha'

    );


    var sayHello = function sayHello(value) {
        console.log('executes fn ---> ' + value);
    };

    var helloJohn = tap('John');

    console.log('should return John: ',
        helloJohn(sayHello) === 'John'
    );

    // RAMDA R.tap
    // Runs the given function with the supplied object, then returns the object.
    // var sayX = x => console.log('x is ' + x);
    // R.tap(sayX, 100); //=> 100
    // logs 'x is 100'

}());
