'use strict';

(function() {

    // Partial Application
    // --------------------
    // function that accepts some number of arguments,
    // binding values to one or more of those arguments,
    // and returning a new function that only accepts
    // the remaining, un-bound arguments.
    // http://benalman.com/news/2012/09/partial-application-in-javascript/

    var partial = function(fn) {

        var slice = [].slice;
        var args = slice.call(arguments, 1); // Convert arguments object to an array, removing the first argument

        return function() {
            // Invoke the originally-specified function, passing in all originally
            // specified arguments, followed by any just-specified arguments
            return fn.apply(null, args.concat(slice.call(arguments, 0)));
        };
    };

    var people = function() {

        var slice = [].slice;
        var args = slice.call(arguments);
        var names = '';

        args.forEach(function(item, idx, arr) {
            names += (item);
            names += (idx === arr.length - 1) ? '.' : ', ';
        });

        return names;
    };

    var withPeople = partial(people, 'Peter', 'Lois');
    console.log(withPeople('John'));

}());
