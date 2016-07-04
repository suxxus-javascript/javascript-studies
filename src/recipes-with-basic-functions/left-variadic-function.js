'use strict';

// A variadic function is a function that is designed to accept a variable number of arguments

(function() {

    var rightVariadic = function(fn) {

        var slice = [].slice;

        if (fn.length < 1) {
            return fn;
        }

        return function() {

            var ordinaryArgs = arguments.length >= 1 ? slice.call(arguments, 0, fn.length - 1) : [];
            var restOfTheArgsList = slice.call(arguments, fn.length - 1);
            var args = fn.length <= arguments.length ? ordinaryArgs.concat([restOfTheArgsList]) : [];
            return fn.apply(null, args);
        };
    };

    console.log('rightVariadic: ',
        rightVariadic(
            function test(first, second, butFirst) {
                return [first, second, butFirst];
            }
        )('why', 'hello', 'there', 'little', 'droid')
    );
}());
