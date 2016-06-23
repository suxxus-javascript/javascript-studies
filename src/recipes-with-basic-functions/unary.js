'use strict';

// Unary
// -----------------
// “Unary” is a function decorator that modifies the number of arguments a function takes:
// Unary takes any function and turns it into a function taking exactly one argument.
// https://leanpub.com/javascriptallongesix/read#leanpub-auto-recipes-with-basic-functions

(function() {

    var unary = function(fn) {
        return fn.length === 1 ? fn : function(arg) {
            return fn.call(null, arg);
        };
    };

    var foo = function(arg1, arg2) {
        return [arg1, arg2];
    };

    console.log('foo.length should be 2: ', foo.length === 2);

    var baaz = unary(foo);
    console.log('baaz.length should be 1: ', baaz.length === 1);

}());
