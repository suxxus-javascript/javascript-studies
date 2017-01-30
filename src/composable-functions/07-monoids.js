'use strict';

/*
Monoid

A value that implements the Monoid specification must also implement the Semigroup specification.

A value which has a Monoid must provide an empty function on its type representative:

*/

const Sum = function(x) {
    return {
        x: x,
        concat: function(o) {
            return Sum(x + o.x);
        },
        inspect: function() {
            return 'Sum(' + x + ')';
        }
    }
};

Sum.empty = function() {
    return Sum(0);
};

console.log(Sum.empty().concat(Sum(2)))

const All = function(x) {
    return {
        x: x,
        concat: function(o) {
            return All(x && o.x);
        },
        inspect: function() {
            return 'All(' + x + ')';
        }
    }
};

All.empty = function() {
    return All(true);
};

console.log(

    All(true)
    .concat(All(false))
    .concat(All.empty())

);
