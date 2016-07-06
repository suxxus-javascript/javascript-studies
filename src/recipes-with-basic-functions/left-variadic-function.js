'use strict';

// A variadic function is a function that is
// designed to accept a variable number of arguments
(function() {

    var rightVariadic = function(fn) {

        var slice = [].slice;

        if (fn.length < 1) {
            return fn;
        }

        return function() {
            var ordinaryArgs = (1 <= arguments.length ? slice.call(arguments, 0, fn.length - 1) : []),
                restOfTheArgsList = slice.call(arguments, fn.length - 1),
                args = (fn.length <= arguments.length ? ordinaryArgs.concat([restOfTheArgsList]) : []);

            return fn.apply(null, args);
        };
    };

    var foo = rightVariadic(function(president, vice, rest) {
        var r = '';

        rest.forEach(function(item, idx) {
            r += item;
            r += (idx === rest.length - 1) ? '. ' : ', ';
        });

        return ({
            'president': president,
            'vice': vice,
            'others': r
        })
    });


    console.log(
        foo('Julia', 'Alberta', 'Ximena', 'Lois', 'Arantxa', 'Fernando')
    )

}());
