'use strict';

var box = function(x) {

    return {

        map: function(fn) {

            return box(fn(x));

        },

        fold: function(fn) {

            return fn(x);
        },

        inspect: function() {

            return 'box(' + x + ')';

        }

    };

};

var newCharFromNumberString = function(value) {

    return box(value)

    .map(function(s) {

        return s.trim();

    })

    .map(function(r) {

        return Number(r);

    })

    .map(function(i) {

        return i + 1;

    })

    .map(function(i) {

        return String.fromCharCode(i);

    })

    .fold(function(c) {

        return c.toLowerCase();

    });


};

var result = newCharFromNumberString(' 64 ');

console.log(result);
